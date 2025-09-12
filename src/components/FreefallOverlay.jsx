import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';

// Creates a physics overlay that makes visible texts and cards fall towards the footer
const FreefallOverlay = () => {
  const [active, setActive] = useState(false);
  const overlayRef = useRef(null);
  const engineRef = useRef(null);
  const renderRef = useRef(null);
  const runnerRef = useRef(null);

  useEffect(() => {
    const toggle = () => setActive((v) => !v);
    window.addEventListener('rocket-gravity', toggle);
    return () => window.removeEventListener('rocket-gravity', toggle);
  }, []);

  useEffect(() => {
    if (!active) {
      cleanup();
      return;
    }
    start();
    return () => cleanup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const start = () => {
    const container = document.createElement('div');
    container.className = 'freefall-overlay';
    const pageHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.documentElement.clientHeight
    );
    Object.assign(container.style, {
      position: 'absolute', left: '0', top: '0', width: '100%', height: pageHeight + 'px', zIndex: 9998, pointerEvents: 'none'
    });
    document.body.appendChild(container);
    overlayRef.current = container;

    // hide real content (but keep layout stable) so only physics clones show
    document.documentElement.classList.add('freefall-mode');

    // Select elements to fall: headings, paragraphs, nav links, buttons, cards
    const selectors = [
      'h1','h2','h3','p','a','li','small','span','button','.nav-link','.glass'
    ];
    const nodes = Array.from(document.querySelectorAll(selectors.join(',')))
      .filter((el) => {
        if (!el.offsetParent) return false;
        const rect = el.getBoundingClientRect();
        return rect.width > 1 && rect.height > 1 && rect.bottom > 0 && rect.top < window.innerHeight;
      });

    // Physics setup
    const engine = Matter.Engine.create();
    engine.world.gravity.y = 1.2;
    const render = Matter.Render.create({ element: container, engine, options: { width: window.innerWidth, height: pageHeight, background: 'transparent', wireframes: false } });
    const runner = Matter.Runner.create();
    engineRef.current = engine; renderRef.current = render; runnerRef.current = runner;

    // World bounds (floor at bottom of viewport)
    const boundary = { isStatic: true, render: { visible: false } };
    const floor = Matter.Bodies.rectangle(window.innerWidth/2, pageHeight + 30, window.innerWidth + 400, 60, boundary);
    const left = Matter.Bodies.rectangle(-30, pageHeight/2, 60, pageHeight + 200, boundary);
    const right = Matter.Bodies.rectangle(window.innerWidth + 30, pageHeight/2, 60, pageHeight + 200, boundary);
    Matter.World.add(engine.world, [floor, left, right]);

    // Clone visible nodes into absolute positioned divs and map to bodies
    const clones = [];
    nodes.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const clone = document.createElement('div');
      clone.className = 'freefall-clone';
      clone.textContent = el.textContent || el.innerText || '';
      Object.assign(clone.style, {
        position: 'absolute', left: rect.left + 'px', top: (rect.top + window.scrollY) + 'px',
        width: rect.width + 'px', height: rect.height + 'px',
        color: window.getComputedStyle(el).color,
        font: window.getComputedStyle(el).font,
        textAlign: window.getComputedStyle(el).textAlign,
        pointerEvents: 'none',
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      });
      container.appendChild(clone);
      const body = Matter.Bodies.rectangle(rect.left + rect.width/2, rect.top + window.scrollY + rect.height/2, Math.max(8, rect.width*0.9), Math.max(8, rect.height*0.9), { restitution: 0.25, frictionAir: 0.035, friction: 0.2 });
      Matter.Body.setVelocity(body, { x: (Math.random()-0.5)*2, y: Math.random()*1.5 });
      Matter.Body.setAngularVelocity(body, (Math.random()-0.5)*0.05);
      clones.push({ el: clone, body });
    });

    Matter.World.add(engine.world, clones.map(c => c.body));
    Matter.Runner.run(runner, engine);
    Matter.Render.run(render);

    const update = () => {
      clones.forEach(({ el, body }) => {
        el.style.transform = `translate(${body.position.x - parseFloat(el.style.left)}px, ${body.position.y - parseFloat(el.style.top)}px) rotate(${body.angle}rad)`;
      });
      engine.timing.timeScale = 1;
      raf = requestAnimationFrame(update);
    };
    let raf = requestAnimationFrame(update);

    const onResize = () => {
      Matter.Render.stop(render);
      render.canvas.remove();
      render.textures = {};
      render.options.width = window.innerWidth; render.options.height = window.innerHeight;
      const canvas = Matter.Render.create({ element: container, engine, options: { width: window.innerWidth, height: window.innerHeight, background: 'transparent', wireframes: false } });
      renderRef.current = canvas; Matter.Render.run(canvas);
    };
    window.addEventListener('resize', onResize);

    overlayRef.current.__cleanup = () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      clones.forEach(({ el }) => el.remove());
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      Matter.World.clear(engine.world, false);
      Matter.Engine.clear(engine);
      if (render.canvas && render.canvas.parentNode) render.canvas.parentNode.removeChild(render.canvas);
    };
  };

  const cleanup = () => {
    document.documentElement.classList.remove('freefall-mode');
    if (overlayRef.current) {
      if (overlayRef.current.__cleanup) overlayRef.current.__cleanup();
      overlayRef.current.remove();
      overlayRef.current = null;
    }
  };

  return null;
};

export default FreefallOverlay;


