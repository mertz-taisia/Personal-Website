import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";


const Hero: React.FC = () => {
  const [activeIcon, setActiveIcon] = useState<string | null>(null);

  return (
    <HeroSection>
      <HeroContainer>
        <ContentWrapper>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Title>Hi, I'm <Highlight>Taisia Mertz</Highlight></Title>
            <Subtitle>Software Developer • Engineer • Artist</Subtitle>
            <Description>
              A multidisciplinary creator passionate about bridging technology and art. 
              With expertise in software development, engineering solutions, and creative design, 
              I bring a unique perspective to every project.
            </Description>
            <ButtonsContainer>
              <CTAButton
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore My Work
                <AnimatedArrow>
                  <ArrowIcon />
                </AnimatedArrow>
              </CTAButton>
            </ButtonsContainer>
            <SocialIcons>
              <IconWithText
                icon={GitHubIcon(activeIcon === "GitHub")}
                text="GitHub"
                isActive={activeIcon === "GitHub"}
                onMouseEnter={() => setActiveIcon("GitHub")}
                onMouseLeave={() => setActiveIcon(null)}
                onClick={() => window.open("https://github.com/mertz-taisia", "_blank")}
              />
              <IconWithText
                icon={LinkedInIcon(activeIcon === "LinkedIn")}
                text="LinkedIn"
                isActive={activeIcon === "LinkedIn"}
                onMouseEnter={() => setActiveIcon("LinkedIn")}
                onMouseLeave={() => setActiveIcon(null)}
                onClick={() => window.open("https://linkedin.com/in/taisia-mertz", "_blank")}
              />
              <IconWithText
                icon={ResumeIcon(activeIcon === "Resume")}
                text="Resume"
                isActive={activeIcon === "Resume"}
                onMouseEnter={() => setActiveIcon("Resume")}
                onMouseLeave={() => setActiveIcon(null)}
                onClick={() => window.open("/documents/resume_taisia_mertz.pdf", "_blank")}
              />
            </SocialIcons>
          </motion.div>
        </ContentWrapper>
        <ImageWrapper
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <ProfileImage src="/images/profile-image.jpg" alt="Taisia Mertz" />
          <ImageBackground />
        </ImageWrapper>
      </HeroContainer>
    </HeroSection>
  );
};

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding: 2rem;
  background: var(--background);
`;

const HeroContainer = styled.div`
  width: 65%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column-reverse;
    text-align: center;
  }
`;

const ContentWrapper = styled.div`
  flex: 1;
  text-align: left;
`;

const ImageWrapper = styled(motion.div)`
  position: relative;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 400px;
`;

const ProfileImage = styled.img`
  width: 400px;
  height: 400px;
  border-radius: 50%;
  object-fit: cover;
  position: relative;
  z-index: 2;
  border: 4px solid var(--background);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    width: 350px;
    height: 350px;
  }
`;

const ImageBackground = styled.div`
  position: absolute;
  width: 420px;
  height: 420px;
  border-radius: 50%;
  background: var(--primary);
  opacity: 0.8;
  z-index: 1;
  top: -10px;
  left: -10px;
  
  @media (max-width: 768px) {
    width: 370px;
    height: 370px;
  }
`;

const Title = styled.h1`
  font-size: 3.0rem;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Highlight = styled.span`
  color: var(--primary);
`;

const Subtitle = styled.h2`
  font-size: 1.4rem;
  color: var(--text-light);
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Description = styled.p`
  font-size: 1.3rem;
  width: 80%;
  margin-bottom: 2rem;
  color: var(--text-light);
`;

const ArrowIcon = () => (
  <svg
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: '1.4rem', height: 'auto' }}
  >
    <path
      d="M5 12h14m0 0l-5-5m5 5l-5 5"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const AnimatedArrow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin-left: 0.5rem;

  svg {
    animation: moveLeftRight 1s infinite alternate ease-in-out;
    margin-top: auto;
  }

  @keyframes moveLeftRight {
    from {
      transform: translateX(-0.2rem);
    }
    to {
      transform: translateX(0.2rem);
    }
  }
`;

const CTAButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
  background: var(--text);
  color: white;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: var(--transition);
  margin-bottom: 2rem;

  &:hover {
    background: var(--secondary);
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  
  @media (max-width: 768px) {
    justify-content: center;
    flex-wrap: wrap;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  
  @media (max-width: 768px) {
    justify-content: center;
    flex-wrap: wrap;
  }
`;

interface IconWithTextProps {
  icon: React.ReactNode;
  text: string;
  isActive: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick?: () => void;
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 7rem;
  height: 3rem;
  cursor: pointer;
`;

const IconWrapper = styled.div<{ isActive: boolean }>`
  width: 35px;
  height: 35px;
  transform: ${({ isActive }) => (isActive ? "scale(1.5)" : "scale(1)")};
  transform: ${({ isActive }) => (isActive ? "translateY(-5px)" : "translateY(0)")};
  transition: transform 0.3s ease;
`;

const Text = styled.span<{ isActive: boolean }>`
  color: var(--text-light);
  transform: ${({ isActive }) => (isActive ? "translateY(-5px)" : "translateY(0)")};
  font-size: ${({ isActive }) => (isActive ? "1.4rem" : "1.2rem")};
  color: ${({ isActive }) => (isActive ? "var(--text)" : "var(--text-light)")};
  transition: transform 0.3s ease;
`;

const GitHubIcon = (isActive: boolean) => (
  <svg
    width="35"
    height="35"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke= {isActive ? "#000000" : "var(--text-light)"}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
  </svg>
);


const LinkedInIcon = (isActive: boolean) => (
  <svg
    width="35"
    height="35"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke= {isActive ? "#000000" : "var(--text-light)"}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
    <path d="M8 11l0 5" />
    <path d="M8 8l0 .01" />
    <path d="M12 16l0 -5" />
    <path d="M16 16v-3a2 2 0 0 0 -4 0" />
  </svg>
);

const ResumeIcon = (isActive: boolean) => (
  <svg
    width="35"
    height="35"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke= {isActive ? "#000000" : "var(--text-light)"}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 3v4a1 1 0 0 0 1 1h4" />
    <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
    <path d="M9 9l1 0" />
    <path d="M9 13l6 0" />
    <path d="M9 17l6 0" />
  </svg>
);

const IconWithText: React.FC<IconWithTextProps> = ({
  icon,
  text,
  isActive,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) => (
  <Container onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={onClick}>
    <IconWrapper isActive={isActive}>{icon}</IconWrapper>
    <Text isActive={isActive}>{text}</Text>
  </Container>
);


export default Hero;