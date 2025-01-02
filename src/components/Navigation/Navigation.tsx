import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <NavWrapper isScrolled={isScrolled}>
      <NavContainer>
        <Logo href="#">Taisia Mertz</Logo>
        <MobileMenuButton onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </MobileMenuButton>
        <NavLinks isMobileMenuOpen={isMobileMenuOpen}>
          <NavItem href="#about">About</NavItem>
          <NavItem href="#projects">Projects</NavItem>
          <NavItem href="#skills">Skills</NavItem>
          <NavItem href="#contact">Contact</NavItem>
        </NavLinks>
      </NavContainer>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <MobileNavItem href="#about" onClick={() => setIsMobileMenuOpen(false)}>
              About
            </MobileNavItem>
            <MobileNavItem href="#skills" onClick={() => setIsMobileMenuOpen(false)}>
              Skills
            </MobileNavItem>
            <MobileNavItem href="#projects" onClick={() => setIsMobileMenuOpen(false)}>
              Projects
            </MobileNavItem>
            <MobileNavItem href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
              Contact
            </MobileNavItem>
          </MobileMenu>
        )}
      </AnimatePresence>
    </NavWrapper>
  );
};

const NavWrapper = styled.nav<{ isScrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: ${props => props.isScrolled ? 'rgba(255, 255, 255, 0.9)' : 'transparent'};
  backdrop-filter: ${props => props.isScrolled ? 'blur(10px)' : 'none'};
  box-shadow: ${props => props.isScrolled ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none'};
  transition: var(--transition);
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.a`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text);
  text-decoration: none;
`;

const NavLinks = styled.div<{ isMobileMenuOpen: boolean }>`
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavItem = styled.a`
  color: var(--text);
  text-decoration: none;
  font-weight: 500;
  transition: var(--transition);

  &:hover {
    color: var(--primary);
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 21px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1100;

  span {
    width: 100%;
    height: 3px;
    background: var(--text);
    border-radius: 3px;
    transition: var(--transition);
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

const MobileMenu = styled(motion.div)`
  display: none;
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  background: white;
  padding: 1rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;

const MobileNavItem = styled.a`
  color: var(--text);
  text-decoration: none;
  padding: 1rem;
  text-align: center;
  font-weight: 500;
  transition: var(--transition);

  &:hover {
    background: var(--card-background);
    color: var(--primary);
  }
`;

export default Navigation;
