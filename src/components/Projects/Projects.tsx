import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Carousel, CarouselItem } from "./Carousel";

type ProjectCategory = 'software' | 'engineering' | 'art';

interface Project {
  title: string;
  description: string;
  content: string;
  technologies: string[];
  image: string;
  role: string;
  category: ProjectCategory;
}


const projectsData: Project[] = [
  {
    title: 'RevSend',
    description: 'Redesigned landing page and marketplace for a startup',
    technologies: ['UI/UX Design', 'React', 'GraphQL'],
    image: '/images/software/revsend.png',
    role: 'Software Engineer',
    category: 'software',
    content: `I redesigned and developed the company landing page and marketplace using React, 
    incorporating responsive design principles and a reusable component architecture. These 
    improvements resulted in a 45% increase in user engagement and a 15% boost in sales conversion 
    rates. I also implemented GraphQL queries and mutations to streamline data fetching, reducing API 
    calls by 30% and improving application load time by 25%.`
  },
  {
    title: 'Booz Allen Hamilton',
    description: 'Built scalable data pipeline and serverless AWS solution for publication analysis',
    technologies: ['Python', 'Data Engineering', 'AWS'],
    image: '/images/software/boozallenhamilton.png',
    role: 'Software Engineer Intern',
    category: 'software',
    content: `During my time at Booz Allen Hamilton, I created a scalable Python data pipeline to process and analyze millions of publications 
    from PubMed and PMC APIs. This pipeline identified over 5,000 relevant unreported publications and 
    improved data extraction efficiency by 40%. Additionally, I designed and implemented a serverless 
    solution using AWS Lambda, API Gateway, and DynamoDB, integrating data validation and deduplication 
    logic to ensure data accuracy at scale.`
  },
  {
    title: 'National Institues of Health',
    description: 'Developed software for voltage gating analysis of ion channels',
    technologies: ['Python', 'Multithreading', 'Numpy/Pandas', 'Matplotlib'],
    image: '/images/software/nih.png',
    role: 'Software Engineer',
    category: 'software',
    content: `I developed and optimized a Python program using NumPy, Pandas, and Matplotlib to analyze 
    voltage gating behavior in ion channels. This program was designed to handle large electrophysiological 
    datasets, significantly enhancing the speed and efficiency of researcher analysis. Additionally, I 
    implemented efficient algorithms and parallelized data processing using Python's multiprocessing and 
    concurrent.futures libraries, enabling the distribution of computationally intensive tasks across 
    multiple CPU cores.`
  }, 
  {
    title: 'BioBotanic',
    description: 'AI-powered greenhouse management system integrating IoT sensors and ML',
    technologies: ['CAD', 'React', 'TypeScript', 'MongoDB', 'TensorFlow', 'IoT'],
    image: '/images/engineering/biobotanic/biobotanic.png',
    role: 'Project Manager',
    category: 'engineering',
    content: `I led a team of eight engineering students to develop a scalable, automated greenhouse 
    system that integrated IoT sensors with a TensorFlow-based plant monitoring model. I built a 
    full-stack application using React, TypeScript, and MongoDB to manage plant growth data and 
    control environmental systems, incorporating custom APIs for data retrieval from IoT sensors and 
    weather services. Additionally, I engineered a scalable machine learning pipeline using TensorFlow 
    and Keras, integrating a Convolutional Neural Network (CNN) into the IoT system for real-time plant 
    health assessment, reducing manual monitoring efforts by 60%.`
  },
  {
    title: 'Magic Mirror',
    description: 'Smart mirror that maps clothing onto the user using body keypoint detection',
    technologies: ['Computer Vision', 'Image Processing'],
    image: '/images/engineering/magicmirror/magicmirror.png',
    role: 'Lead Software Engineer',
    category: 'engineering',
    content: `We developed a smart interactive mirror that dynamically maps clothing onto individuals 
    using advanced pose estimation and gesture recognition technologies. By leveraging Mediapipe Pose, 
    we detected and extracted precise body landmarks for accurate clothing placement, while implementing 
    gesture detection for intuitive navigation through the interface. Clothing images were dynamically 
    mapped and scaled onto pose landmarks using Mediapipe Pose, ensuring realistic alignment and fit, 
    and seamlessly overlaid onto the live video feed for real-time rendering.`
  },
  {
    title: 'Paper Airplayin',
    description: 'Remote control paper airplain module',
    technologies: ['Embedded Systems', 'Mechanical Design'],
    image: '/images/engineering/paperairplyn/paperairplayn.png',
    role: 'Mechanical Engineer',
    category: 'engineering',
    content: `I utilized CAD software to design and prototype mechanical components for a lightweight 
    remote control flight module, offering three degrees of motion and a customizable fit. The design 
    ensured optimal aerodynamics, physics, and modularity. I also employed 3D printing technology to 
    manufacture precise and functional parts, resulting in a successful proof-of-concept prototype.`
  },
  {
    title: 'UI/UX Design',
    description: 'Collection of custom graphics, logos, and website designs',
    technologies: ['Photoshop', 'Figma', 'Abode Illustrator'],
    image: '/images/art/design/display.jpg',
    role: 'UI/UX Designer',
    category: 'art',
    content: `This is some sample content for the RevSend project. I am adding this to fill the space up. I will add the actual content in the future.
    This is some sample content for the RevSend project. I am adding this to fill the space up. I will add the actual content in the future.
    This is some sample content for the RevSend project. I am adding this to fill the space up. I will add the actual content in the future.`
  },
  {
    title: 'Paintings',
    description: 'Works created using traditional mediums',
    technologies: ['Oil', 'Acrylic'],
    image: '/images/art/paintings/display.png',
    role: '',
    category: 'art',
    content: `This is some sample content for the RevSend project. I am adding this to fill the space up. I will add the actual content in the future.
    This is some sample content for the RevSend project. I am adding this to fill the space up. I will add the actual content in the future.
    This is some sample content for the RevSend project. I am adding this to fill the space up. I will add the actual content in the future.`
  },
  {
    title: 'Multimedia Work',
    description: '3D mixed-medium art pieces',
    technologies: ['Paper Mache', 'Jianzhi', 'Felting'],
    image: '/images/art/multimedia/display.png',
    role: '',
    category: 'art',
    content: `This is some sample content for the RevSend project. I am adding this to fill the space up. I will add the actual content in the future.
    This is some sample content for the RevSend project. I am adding this to fill the space up. I will add the actual content in the future.
    This is some sample content for the RevSend project. I am adding this to fill the space up. I will add the actual content in the future.`
  }
];

const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('software');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const [activePhoto, setActivePhoto] = useState<Project | null>(null);

  const [design, setDesign] = useState<CarouselItem[]>([]);
  const [multimedia, setMultimedia] = useState<CarouselItem[]>([]);
  const [paintings, setPaintings] = useState<CarouselItem[]>([]);

  useEffect(() => {
    fetch("/images/art/design/images.json")
      .then((response) => response.json())
      .then((data) => setDesign(data.slides))
      .catch((error) => console.error("Error loading slides:", error));
  }, []);
  
  useEffect(() => {
    fetch("/images/art/multimedia/images.json")
      .then((response) => response.json())
      .then((data) => setMultimedia(data.slides))
      .catch((error) => console.error("Error loading slides:", error));
  }, []);
  
  useEffect(() => {
    fetch("/images/art/paintings/images.json")
      .then((response) => response.json())
      .then((data) => setPaintings(data.slides))
      .catch((error) => console.error("Error loading slides:", error));
  }, []);
  
  const filteredProjects = projectsData.filter(project => 
    project.category === activeCategory
  );

  return (
    <ProjectsSection id="projects">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <SectionTitle>Featured Work</SectionTitle>
          <CategoryFilter>
            <CategoryButton 
              active={activeCategory === 'software'}
              onClick={() => {
                setActiveCategory('software');
                setActiveProject(null);
                }
              }
            >
              Software
            </CategoryButton>
            <CategoryButton 
              active={activeCategory === 'engineering'}
              onClick={() => {
                setActiveCategory('engineering');
                setActiveProject(null);
                }
              }
            >
              Engineering
            </CategoryButton>
            <CategoryButton 
              active={activeCategory === 'art'}
              onClick={() => {
                setActiveCategory('art');
                setActiveProject(null);
                }
              }
            >
              Art
            </CategoryButton>
          </CategoryFilter>
            <AnimatePresence mode="wait"><ContentContainer>
              

            {activeProject ? (
              activeProject.category === 'art' ? (
                activeProject.title === 'UI/UX Design' ? (
                <ModalContent>
                  <CarouselFrame>
                    <BackArrow onClick={() => setActiveProject(null)}>
                      <BackArrowSVG/>
                    </ BackArrow>
                    <Carousel data={design} />
                  </CarouselFrame>
                </ModalContent>
                ) : activeProject.title === 'Multimedia Work' ? (
                  <CarouselFrame>
                    <BackArrow onClick={() => setActiveProject(null)}>
                      <BackArrowSVG/>
                    </ BackArrow>
                    <Carousel data={multimedia} />
                  </CarouselFrame>
                ) : (
                  <CarouselFrame>
                    <BackArrow onClick={() => setActiveProject(null)}>
                      <BackArrowSVG/>
                    </ BackArrow>
                    <Carousel data={paintings} />
                  </CarouselFrame>
                )
              ) : (
              <ModalContent 
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.1, delay: 0 }}
              >
                <CloseButton onClick={() => setActiveProject(null)}>×</CloseButton>
                <ModalImage src={activeProject.image} alt={activeProject.title} />
                <ModalContentRight>
                  <ModalTitle>{activeProject.title}</ModalTitle>
                  <ProjectRole>{activeProject.role}</ProjectRole>
                  <TechStackModal>
                    {activeProject.technologies.map((tech) => (
                      <TechTag key={tech}>{tech}</TechTag>
                    ))}
                  </TechStackModal>
                  <ModalDescription>{activeProject.content}</ModalDescription>
                </ModalContentRight>
              </ModalContent>
              )
            ) : (
              <ProjectsGrid>
                <AnimatePresence mode="wait">
                  {filteredProjects.map((project, index) => (
                    <ProjectCard
                      key={project.title}
                      whileHover={{ scale: 1.03 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      onClick={() => setActiveProject(project)}
                    >
                      <ProjectImage src={project.image} alt={project.title} />
                      <ProjectContent>
                        <ProjectTitle>{project.title}</ProjectTitle>
                        <ProjectDescription>{project.description}</ProjectDescription>
                        <TechStack>
                          {project.technologies.map((tech) => (
                            <TechTag key={tech}>{tech}</TechTag>
                          ))}
                        </TechStack>
                      </ProjectContent>
                    </ProjectCard>
                  ))}
                </AnimatePresence>
              </ProjectsGrid>
            )}
          </ContentContainer>
            </AnimatePresence>

        </motion.div>
      </Container>
    </ProjectsSection>
  );
};


const ProjectsSection = styled.section`
  padding: 5rem 0;
  height: 90vh;
`;

const Container = styled.div`
  width: 70%;
  margin: 0 auto;
  padding: 0 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  color: var(--text);
`;

const CategoryFilter = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
`;

const CategoryButton = styled.button<{ active: boolean }>`
  padding: 0.8rem 1.5rem;
  border-radius: 50px;
  border: none;
  background: ${(props) => (props.active ? 'var(--primary)' : 'transparent')};
  color: ${(props) => (props.active ? 'white' : 'var(--text)')};
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
  border: 2px solid ${(props) => (props.active ? 'var(--primary)' : 'var(--text-light)')};
  width: 120px;

  &:hover {
    background: var(--primary);
    color: white;
    border-color: var(--primary);
  }
`;

const ContentContainer = styled.div`
  margin-top: 2rem;
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const ProjectCard = styled(motion(Link))`
  text-decoration: none;
  color: inherit;
  background: var(--card-background);
  border-radius: 15px;
  overflow: hidden;
  cursor: pointer;
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const ProjectContent = styled.div`
  padding: 1.5rem;
`;

const ProjectTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: var(--text);
`;

const ProjectRole = styled.p`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: var(--text-light);
  font-style: italic;
`;

const ProjectDescription = styled.p`
  font-size: 1rem;
  color: var(--text-light);
  margin-bottom: 1rem;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const TechTag = styled.span`
  background: var(--primary);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const CarouselFrame = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled(motion(Link))`
  display: flex;
  direction: row;
  background: #FFFFFF;
  padding: 2rem;
  border-radius: 15px;
  width: 100%;
  height: 450px;
  margin: 0 auto;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  transition: var(--transition);
`;

const ModalImage = styled.img`
  object-fit: cover;
  width: 30%;
  border-radius: 10px;
`;

const ModalContentRight = styled.div`
  padding: 2rem;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 2rem;
  background: transparent;
  border: none;
  font-size: 3rem;
  cursor: pointer;
  color: #D0D0D0;
  z-index: 5;
`;

const BackArrow = styled.button`
  position: absolute;
  top: 0rem;
  right: -4rem;
  height: 2.5rem;
  width: 2.5rem;
  background: transparent;
  border: none;
  font-size: 3rem;
  cursor: pointer;
  color: #999999;
  z-index: 5;
`;

const ModalTitle = styled.h3`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const ModalDescription = styled.p`
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  color: var(--text-light);
`;
const TechStackModal = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const BackArrowSVG = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <svg
      width="auto"
      height="100%"
      viewBox="0 0 21 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        cursor: "pointer",
        transform: hovered ? "translateX(-20%)" : "translateX(0)",
        transition: "transform 0.3s ease",
      }}
    >
      <path d="M19.4971 1.47461L3.81836 17.099L19.4971 32.7246" stroke="#D0D0D0" stroke-width="4"/>
    </svg>
  );
}



export default Projects;

