import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { DiJavascript1, DiReact, DiJava, DiDocker } from 'react-icons/di';
import { SiTypescript, SiFlask, SiDjango, SiGraphql, SiMongodb, SiAmazonwebservices, SiTensorflow, SiNodedotjs } from 'react-icons/si';

const skillsData = [
  { icon: <img src="/icons/pythonLogo.png" alt="Python" style={{ width: '2.5rem', height: '2.5rem' }} />, name: 'Python', level: 95, color: '#3776AB' },
  { icon: <DiJavascript1 color="#F7DF1E" />, name: 'JavaScript', level: 80, color: '#F7DF1E' },
  { icon: <SiTypescript color="#007ACC" />, name: 'TypeScript', level: 85, color: '#007ACC' },
  { icon: <img src="/icons/javaLogo.png" alt="Java" style={{ width: '2.5rem', height: '2.5rem' }} />, name: 'Java', level: 80, color: '#007396' },
  { icon: <DiReact color="#61DAFB" />, name: 'React', level: 90, color: '#61DAFB' },
  { icon: <SiNodedotjs color="#339933" />, name: 'Node.js', level: 70, color: '#339933' },
  { icon: <SiFlask color="#000000" />, name: 'Flask', level: 65, color: '#000000' },
  { icon: <SiDjango color="#092E20" />, name: 'Django', level: 65, color: '#092E20' },
  { icon: <SiGraphql color="#E10098" />, name: 'GraphQL', level: 80, color: '#E10098' },
  { icon: <SiMongodb color="#47A248" />, name: 'MongoDB', level: 70, color: '#47A248' },
  { icon: <img src="/icons/dockerLogo.png" alt="Docker" style={{ width: '2.5rem', height: '2.5rem' }} />, name: 'Docker', level: 65, color: '#2496ED' },
  { icon: <SiAmazonwebservices color="#FF9900" />, name: 'AWS', level: 50, color: '#FF9900' },
  { icon: <SiTensorflow color="#FF6F00" />, name: 'TensorFlow', level: 75, color: '#FF6F00' },
];

const Skills: React.FC = () => {
  // Sort skillsData by level in descending order
  const sortedSkillsData = [...skillsData].sort((a, b) => b.level - a.level);

  return (
    <SkillsSection id="skills">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <SectionTitle>Skills & Technologies</SectionTitle>
          <SkillsGrid>
            {sortedSkillsData.map((skill, index) => (
              <SkillCard
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <IconWrapper>{skill.icon}</IconWrapper>
                <SkillName>{skill.name}</SkillName>
                <ProgressBarWrapper>
                  <ProgressBar width={skill.level} color={skill.color} />
                </ProgressBarWrapper>
              </SkillCard>
            ))}
          </SkillsGrid>
        </motion.div>
      </Container>
    </SkillsSection>
  );
};

const SkillsSection = styled.section`
  padding: 5rem 0;
  background: var(--card-background);
`;

const Container = styled.div`
  max-width: 70%;
  margin: 0 auto;
  padding: 0 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  color: var(--text);
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const SkillCard = styled(motion.div)`
  background: var(--background);
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: var(--transition);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }
`;

const IconWrapper = styled.div`
  font-size: 2.5rem;
  color: var(--primary);
  margin-bottom: 1rem;
`;

const SkillName = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: var(--text);
`;

const ProgressBarWrapper = styled.div`
  background: var(--background);
  border-radius: 50px;
  height: 8px;
  overflow: hidden;
`;

const ProgressBar = styled.div<{ width: number; color: string }>`
  width: ${props => props.width}%;
  height: 100%;
  background: ${props => props.color};
  border-radius: 50px;
  transition: width 1s ease-in-out;
`;

export default Skills;
