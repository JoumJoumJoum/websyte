import expertTalkImg from '../events/Expert Talk on Artificial Intelligence and Remote Sensing/image.png';
import workshopImg from '../events/One-Day Online Workshop on The Journey from Development to Production/image.png';
import orientationImg from '../events/Orientation Day Report/image.png';

export const eventsData = [
  {
    id: 1,
    type: 'past',
    title: 'Expert Talk on AI and Remote Sensing',
    date: 'Sep 18, 2025',
    img: expertTalkImg,
    desc: 'The IEEE GRSS Student Chapter organized a Guest Talk Session with Dr. Surendra Kumar Sharma from IIRS Dehradun, exploring applications of AI and Remote Sensing in real-world contexts.'
  },
  {
    id: 2,
    type: 'past',
    title: 'Orientation Day Report',
    date: 'TBA', // Date not specified in source text
    img: orientationImg,
    desc: 'The IEEE GRSS was a part of the Orientation Program hosted by Manipal University. We welcomed first year students with detailed posters and a presentation conveying the vision and mission of our club.'
  },
  {
    id: 3,
    type: 'upcoming',
    title: 'Workshop: Dev to Production',
    date: 'TBA',
    img: workshopImg,
    desc: 'Join us for a One-Day Online Workshop on "The Journey from Development to Production". Learn key insights and best practices for deploying your applications.'
  },
  {
    id: 4,
    type: 'past',
    title: 'Research Paper Submission & Internship',
    date: 'TBA',
    img: require('../events/Research Paper Submission & Internship Report/image.png'),
    desc: 'The IEEE GRSS at MUJ facilitated the submission of a research paper titled "Comparative Analysis of Machine Learning and Deep Learning Models for Land Use Classification: On UC Merced Dataset" by students Parv Aggarwal, Kushagra Gautam, Kartik Sinha, and Pranshu Pranjal, under the guidance of Dr. Yadavendra Pratap Singh. Additionally, students secured internships at IIRS Dehradun.'
  },
  {
    id: 5,
    type: 'past',
    title: 'Innovate & Invest Workshop',
    date: 'TBA',
    img: require('../events/Innovate & Invest/image.png'),
    desc: 'IEEE GRSS conducted the Innovate & Invest workshop, featuring an expert talk by Mr. Saleem Khan, AVP at Arthnirmiti. The session brought startups and financial expertise together, offering valuable insights into investment strategies and turning innovative ideas into reality.'
  }
];
