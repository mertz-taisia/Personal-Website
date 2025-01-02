import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

const Contact: React.FC = () => {
  const [activeIcon, setActiveIcon] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <ContactSection id="contact">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <SectionTitle>Let's Connect</SectionTitle>
          <ContentWrapper>
            <InfoText>
                Based in Los Angeles, CA. Feel free to reach out for collaborations, 
                opportunities, or just to say hello!
              </InfoText>
            <ContactInfo>
              <SocialIcons>
                <ContainerWithText
                  onMouseEnter={() => setActiveIcon("GitHub")}
                  onMouseLeave={() => setActiveIcon(null)}
                  onClick={() => window.open("https://github.com/mertz-taisia", "_blank")}
                >
                  <IconWrapper isActive={activeIcon === "GitHub"}>
                    <GitHubIcon isActive={activeIcon === "GitHub"} />
                  </IconWrapper>
                  <Text>mertz-taisia</Text>
                </ContainerWithText>

                <ContainerWithText
                  onMouseEnter={() => setActiveIcon("LinkedIn")}
                  onMouseLeave={() => setActiveIcon(null)}
                  onClick={() => window.open("https://linkedin.com/in/taisia-mertz", "_blank")}
                >
                  <IconWrapper isActive={activeIcon === "LinkedIn"}>
                    <LinkedInIcon isActive={activeIcon === "LinkedIn"} />
                  </IconWrapper>
                  <Text>taisia-mertz</Text>
                </ContainerWithText>

                <ContainerWithText
                  onMouseEnter={() => setActiveIcon("Email")}
                  onMouseLeave={() => setActiveIcon(null)}
                  onClick={() => {
                    navigator.clipboard.writeText("tmertz@usc.edu")
                      .then(() => alert("Email copied to clipboard!"))
                      .catch((err) => console.error("Failed to copy email: ", err));
                  }}
                >
                  <IconWrapper isActive={activeIcon === "Email"}>
                    <EmailIcon isActive={activeIcon === "Email"} />
                  </IconWrapper>
                  <Text>tmertz@usc.edu</Text>
                </ContainerWithText>
              </SocialIcons>
            </ContactInfo>
          </ContentWrapper>
        </motion.div>
      </Container>
    </ContactSection>
  );
};

const ContactSection = styled.section`
  padding: 5rem 0;
  background: var(--background);
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const EmailContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  height: 3rem;
  padding: 0 1rem;
  cursor: pointer;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 0rem;
  color: var(--text);
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 0.5rem;
`;


const InfoText = styled.p`
  font-size: 1.1rem;
  color: var(--text-light);
  line-height: 2;
  margin-top: 1rem;
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: start; 
  align-items: center;
  margin-top: 0.5rem;
  margin-bottom: 2rem;
`;

interface IconProps {
  icon: React.ReactNode;
  isActive: boolean;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const Icon: React.FC<IconProps> = ({
  icon,
  isActive,
  onClick,
  onMouseEnter,
  onMouseLeave,
}) => (
  <IconWrapper
    isActive={isActive}
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    {icon}
  </IconWrapper>
);

const IconWrapper = styled.div<{ isActive: boolean }>`
  position: relative;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.3s ease;

  transform: ${({ isActive }) => (isActive ? "scale(1.2)" : "scale(1)")};
  color: ${({ isActive }) => (isActive ? "var(--primary)" : "var(--text-light)")};

  &:hover > div {
    visibility: visible;
    opacity: 1;
    transform: translateY(-10px);
  }

  svg {
    width: 100%;
    height: 100%;
  }
`;

const GitHubIcon = ({ isActive }: { isActive: boolean }) => (
  <svg
    width="35"
    height="35"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke={isActive ? "var(--primary)" : "var(--text-light)"}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
  </svg>
);

const LinkedInIcon = ({ isActive }: { isActive: boolean }) => (
  <svg
    width="35"
    height="35"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke={isActive ? "var(--primary)" : "var(--text-light)"}
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

const EmailIcon = ({ isActive }: { isActive: boolean }) => (
  <svg
    width="35"
    height="35"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke={isActive ? "var(--primary)" : "var(--text-light)"}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" />
    <path d="M3 7l9 6l9 -6" />
  </svg>
);

const ContainerWithText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative; /* Enable absolute positioning for text */
  width: 50px; /* Fixed width for consistent alignment */
  height: 50px;
  cursor: pointer;
`;


const Text = styled.span`
  position: absolute;
  bottom: 120%; /* Position above the icon */
  left: 50%;
  transform: translateX(-50%) translateY(10px); /* Start below the final position */
  white-space: nowrap; /* Prevent wrapping */
  background: var(--primary); /* Primary color for the container */
  color: #fff; /* White text */
  font-weight: 600;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 0.9rem;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.3s ease, transform 0.3s ease;

  /* Add arrow at the bottom */
  &::after {
    content: '';
    position: absolute;
    top: 100%; /* Position at the bottom of the tooltip */
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid var(--primary); /* Match the container color */
  }

  ${ContainerWithText}:hover & {
    visibility: visible;
    opacity: 1;
    transform: translateX(-50%) translateY(0); /* Move to the final position */
  }
`;






export default Contact;
