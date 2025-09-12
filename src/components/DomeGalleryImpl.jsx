import { useEffect, useMemo, useRef, useCallback } from 'react';
import { useGesture } from '@use-gesture/react';
import './DomeGallery.css';

const DEFAULT_IMAGES = [
  { src: '/images/image.png', alt: 'Image 1' },
  { src: '/images/image2.png', alt: 'Image 2' },
  { src: '/images/image3.png', alt: 'Image 3' },
  { src: '/images/image4.png', alt: 'Image 4' },
  { src: '/images/image5.png', alt: 'Image 5' },
  { src: '/images/logo.png', alt: 'Logo' },
];

const DEFAULTS = { maxVerticalRotationDeg: 5, dragSensitivity: 20, enlargeTransitionMs: 300, segments: 35 };
const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
const normalizeAngle = d => ((d % 360) + 360) % 360;
const wrapAngleSigned = deg => { const a = (((deg + 180) % 360) + 360) % 360; return a - 180; };
const getDataNumber = (el, name, fallback) => { const attr = el.dataset[name] ?? el.getAttribute(`data-${name}`); const n = attr == null ? NaN : parseFloat(attr); return Number.isFinite(n) ? n : fallback; };

function buildItems(pool, seg) {
  const xCols = Array.from({ length: seg }, (_, i) => -37 + i * 2);
  const evenYs = [-4, -2, 0, 2, 4];
  const oddYs = [-3, -1, 1, 3, 5];
  const coords = xCols.flatMap((x, c) => { const ys = c % 2 === 0 ? evenYs : oddYs; return ys.map(y => ({ x, y, sizeX: 2, sizeY: 2 })); });
  const totalSlots = coords.length;
  const normalizedImages = pool.map(image => typeof image === 'string' ? { src: image, alt: '' } : { src: image.src || '', alt: image.alt || '' });
  const used = Array.from({ length: totalSlots }, (_, i) => normalizedImages[i % normalizedImages.length]);
  for (let i = 1; i < used.length; i++) { if (used[i].src === used[i - 1].src) { for (let j = i + 1; j < used.length; j++) { if (used[j].src !== used[i].src) { const tmp = used[i]; used[i] = used[j]; used[j] = tmp; break; } } } }
  return coords.map((c, i) => ({ ...c, src: used[i].src, alt: used[i].alt }));
}

function computeItemBaseRotation(offsetX, offsetY, sizeX, sizeY, segments) {
  const unit = 360 / segments / 2;
  const rotateY = unit * (offsetX + (sizeX - 1) / 2);
  const rotateX = unit * (offsetY - (sizeY - 1) / 2);
  return { rotateX, rotateY };
}

export default function DomeGallery({ images = DEFAULT_IMAGES, fit = 0.5, fitBasis = 'auto', minRadius = 600, maxRadius = Infinity, padFactor = 0.25, overlayBlurColor = '#060010', maxVerticalRotationDeg = DEFAULTS.maxVerticalRotationDeg, dragSensitivity = DEFAULTS.dragSensitivity, enlargeTransitionMs = DEFAULTS.enlargeTransitionMs, segments = DEFAULTS.segments, dragDampening = 2, openedImageWidth = '250px', openedImageHeight = '350px', imageBorderRadius = '30px', openedImageBorderRadius = '30px', grayscale = true }) {
  const rootRef = useRef(null); const mainRef = useRef(null); const sphereRef = useRef(null); const frameRef = useRef(null); const viewerRef = useRef(null); const scrimRef = useRef(null); const focusedElRef = useRef(null); const originalTilePositionRef = useRef(null);
  const rotationRef = useRef({ x: 0, y: 0 }); const startRotRef = useRef({ x: 0, y: 0 }); const startPosRef = useRef(null); const draggingRef = useRef(false); const movedRef = useRef(false); const inertiaRAF = useRef(null); const openingRef = useRef(false); const openStartedAtRef = useRef(0); const lastDragEndAt = useRef(0);
  const scrollLockedRef = useRef(false);
  const lockScroll = useCallback(() => { if (scrollLockedRef.current) return; scrollLockedRef.current = true; document.body.classList.add('dg-scroll-lock'); }, []);
  const unlockScroll = useCallback(() => { if (!scrollLockedRef.current) return; if (rootRef.current?.getAttribute('data-enlarging') === 'true') return; scrollLockedRef.current = false; document.body.classList.remove('dg-scroll-lock'); }, []);

  const items = useMemo(() => buildItems(images, segments), [images, segments]);

  const applyTransform = (xDeg, yDeg) => { const el = sphereRef.current; if (el) { el.style.transform = `translateZ(calc(var(--radius) * -1)) rotateX(${xDeg}deg) rotateY(${yDeg}deg)`; } };
  const lockedRadiusRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current; if (!root) return; const ro = new ResizeObserver(entries => { const cr = entries[0].contentRect; const w = Math.max(1, cr.width), h = Math.max(1, cr.height); const minDim = Math.min(w, h), maxDim = Math.max(w, h), aspect = w / h; let basis; switch (fitBasis) { case 'min': basis = minDim; break; case 'max': basis = maxDim; break; case 'width': basis = w; break; case 'height': basis = h; break; default: basis = aspect >= 1.3 ? w : minDim; } let radius = basis * fit; const heightGuard = h * 1.35; radius = Math.min(radius, heightGuard); radius = clamp(radius, minRadius, maxRadius); lockedRadiusRef.current = Math.round(radius); const viewerPad = Math.max(8, Math.round(minDim * padFactor)); root.style.setProperty('--radius', `${lockedRadiusRef.current}px`); root.style.setProperty('--viewer-pad', `${viewerPad}px`); root.style.setProperty('--overlay-blur-color', overlayBlurColor); root.style.setProperty('--tile-radius', imageBorderRadius); root.style.setProperty('--enlarge-radius', openedImageBorderRadius); root.style.setProperty('--image-filter', grayscale ? 'grayscale(1)' : 'none'); applyTransform(rotationRef.current.x, rotationRef.current.y); const enlargedOverlay = viewerRef.current?.querySelector('.enlarge'); if (enlargedOverlay && frameRef.current && mainRef.current) { const frameR = frameRef.current.getBoundingClientRect(); const mainR = mainRef.current.getBoundingClientRect(); const hasCustomSize = openedImageWidth && openedImageHeight; if (hasCustomSize) { const tempDiv = document.createElement('div'); tempDiv.style.cssText = `position: absolute; width: ${openedImageWidth}; height: ${openedImageHeight}; visibility: hidden;`; document.body.appendChild(tempDiv); const tempRect = tempDiv.getBoundingClientRect(); document.body.removeChild(tempDiv); const centeredLeft = frameR.left - mainR.left + (frameR.width - tempRect.width) / 2; const centeredTop = frameR.top - mainR.top + (frameR.height - tempRect.height) / 2; enlargedOverlay.style.left = `${centeredLeft}px`; enlargedOverlay.style.top = `${centeredTop}px`; } else { enlargedOverlay.style.left = `${frameR.left - mainR.left}px`; enlargedOverlay.style.top = `${frameR.top - mainR.top}px`; enlargedOverlay.style.width = `${frameR.width}px`; enlargedOverlay.style.height = `${frameR.height}px`; } } }); ro.observe(root); return () => ro.disconnect(); }, [fit, fitBasis, minRadius, maxRadius, padFactor, overlayBlurColor, grayscale, imageBorderRadius, openedImageBorderRadius, openedImageWidth, openedImageHeight]);

  useEffect(() => { applyTransform(rotationRef.current.x, rotationRef.current.y); }, []);

  const stopInertia = useCallback(() => { if (inertiaRAF.current) { cancelAnimationFrame(inertiaRAF.current); inertiaRAF.current = null; } }, []);
  const startInertia = useCallback((vx, vy) => { const MAX_V = 1.4; let vX = clamp(vx, -MAX_V, MAX_V) * 80; let vY = clamp(vy, -MAX_V, MAX_V) * 80; let frames = 0; const d = clamp(dragDampening ?? 0.6, 0, 1); const frictionMul = 0.94 + 0.055 * d; const stopThreshold = 0.015 - 0.01 * d; const maxFrames = Math.round(90 + 270 * d); const step = () => { vX *= frictionMul; vY *= frictionMul; if (Math.abs(vX) < stopThreshold && Math.abs(vY) < stopThreshold) { inertiaRAF.current = null; return; } if (++frames > maxFrames) { inertiaRAF.current = null; return; } const nextX = clamp(rotationRef.current.x - vY / 200, -maxVerticalRotationDeg, maxVerticalRotationDeg); const nextY = wrapAngleSigned(rotationRef.current.y + vX / 200); rotationRef.current = { x: nextX, y: nextY }; applyTransform(nextX, nextY); inertiaRAF.current = requestAnimationFrame(step); }; stopInertia(); inertiaRAF.current = requestAnimationFrame(step); }, [dragDampening, maxVerticalRotationDeg, stopInertia]);

  useGesture({ onDragStart: ({ event }) => { stopInertia(); const evt = event; draggingRef.current = true; movedRef.current = false; startRotRef.current = { ...rotationRef.current }; startPosRef.current = { x: evt.clientX, y: evt.clientY }; }, onDrag: ({ event, last, velocity = [0, 0], direction = [0, 0], movement }) => { if (!draggingRef.current || !startPosRef.current) return; const evt = event; const dxTotal = evt.clientX - startPosRef.current.x; const dyTotal = evt.clientY - startPosRef.current.y; if (!movedRef.current) { const dist2 = dxTotal * dxTotal + dyTotal * dyTotal; if (dist2 > 16) movedRef.current = true; } const nextX = clamp(startRotRef.current.x - dyTotal / dragSensitivity, -maxVerticalRotationDeg, maxVerticalRotationDeg); const nextY = wrapAngleSigned(startRotRef.current.y + dxTotal / dragSensitivity); if (rotationRef.current.x !== nextX || rotationRef.current.y !== nextY) { rotationRef.current = { x: nextX, y: nextY }; applyTransform(nextX, nextY); } if (last) { draggingRef.current = false; let [vMagX, vMagY] = velocity; const [dirX, dirY] = direction; let vx = vMagX * dirX; let vy = vMagY * dirY; if (Math.abs(vx) < 0.001 && Math.abs(vy) < 0.001 && Array.isArray(movement)) { const [mx, my] = movement; vx = clamp((mx / dragSensitivity) * 0.02, -1.2, 1.2); vy = clamp((my / dragSensitivity) * 0.02, -1.2, 1.2); } if (Math.abs(vx) > 0.005 || Math.abs(vy) > 0.005) startInertia(vx, vy); if (movedRef.current) lastDragEndAt.current = performance.now(); movedRef.current = false; } } }, { target: mainRef, eventOptions: { passive: true } });

  useEffect(() => { return () => { document.body.classList.remove('dg-scroll-lock'); }; }, []);

  const onTileClick = useCallback(e => {}, []);
  const onTilePointerUp = useCallback(e => {}, []);
  const onTileTouchEnd = useCallback(e => {}, []);

  return (
    <div ref={rootRef} className="sphere-root" style={{ ['--segments-x']: segments, ['--segments-y']: segments }}>
      <main ref={mainRef} className="sphere-main">
        <div className="stage">
          <div ref={sphereRef} className="sphere">
            {useMemo(() => buildItems(DEFAULT_IMAGES, segments), [segments]).map((it, i) => (
              <div key={`${it.x},${it.y},${i}`} className="item" data-offset-x={it.x} data-offset-y={it.y} data-size-x={it.sizeX} data-size-y={it.sizeY} style={{ ['--offset-x']: it.x, ['--offset-y']: it.y, ['--item-size-x']: it.sizeX, ['--item-size-y']: it.sizeY }}>
                <div className="item__image"><img src={it.src} alt={it.alt} draggable={false} /></div>
              </div>
            ))}
          </div>
        </div>
        <div className="overlay" />
        <div className="overlay overlay--blur" />
        <div className="edge-fade edge-fade--top" />
        <div className="edge-fade edge-fade--bottom" />
        <div className="viewer"><div className="scrim" /><div className="frame" /></div>
      </main>
    </div>
  );
}


