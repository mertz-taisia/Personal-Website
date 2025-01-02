import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <AboutSection id="about">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <SectionTitle>About Me</SectionTitle>
          <ContentWrapper>
            <AboutText>
              <p>
                I'm a Computer Science student at the University of Southern California, set to graduate in May 2025. 
                With a strong foundation in both frontend and backend development, I've had the opportunity to work 
                with leading organizations like RevSend, Booz Allen Hamilton, and the National Institutes of Health.
              </p>
              <p>
                My experience spans across full-stack development, machine learning, and cloud computing. I've worked 
                on projects ranging from developing scalable data pipelines to implementing AI-powered systems. I'm 
                particularly passionate about creating efficient, user-friendly solutions that make a real impact.
              </p>
            </AboutText>
            <Stats>
              <StatItem>
                <StatNumber>3+</StatNumber>
                <StatLabel>Years of Experience</StatLabel>
              </StatItem>
              <StatItem>
                <StatNumber>4+</StatNumber>
                <StatLabel>Major Projects</StatLabel>
              </StatItem>
              <StatItem>
                <StatNumber>3</StatNumber>
                <StatLabel>Professional Roles</StatLabel>
              </StatItem>
            </Stats>
          </ContentWrapper>
        </motion.div>
      </Container>
    </AboutSection>
  );
};

const AboutSection = styled.section`
  background: var(--card-background);
  padding: 5rem 0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  color: var(--text);
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: 3fr 2fr;
  }
`;

const AboutText = styled.div`
  p {
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
    color: var(--text);
    line-height: 1.8;
  }
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1.5rem;
  align-content: start;
`;

const StatItem = styled.div`
  text-align: center;
  padding: 1.5rem;
  background: var(--background);
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: var(--text-light);
`;

export default About;
