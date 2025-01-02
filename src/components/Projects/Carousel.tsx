import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import { privateEncrypt } from "crypto";

// Define the type for each item in the data array
export interface CarouselItem {
  src: string;
  alt: string;
}

// Define the props type for the Carousel component
interface CarouselProps {
  data: CarouselItem[];
}

export const Carousel: React.FC<CarouselProps> = ({ data }) => {
  const [slide, setSlide] = useState(0);
  const [leftArrowActive, setLeftArrowActive] = useState(false);
  const [rightArrowActive, setRightArrowActive] = useState(false);

  const nextItem = () => {
    setRightArrowActive(true);
    setSlide((prev) => (prev === data.length - 1 ? 0 : prev + 1));
    setTimeout(() => setRightArrowActive(false), 300); // Reset animation after 300ms
  };

  const prevItem = () => {
    setLeftArrowActive(true);
    setSlide((prev) => (prev === 0 ? data.length - 1 : prev - 1));
    setTimeout(() => setLeftArrowActive(false), 300); // Reset animation after 300ms
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        nextItem();
      } else if (event.key === "ArrowLeft") {
        prevItem();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [data.length]);

  return (
    <CarouselContainer>
      <SlidesContainer>
        {data.map((item, idx) => {
          const isActive = idx === slide;
          const isPrevious = idx === (slide - 1 + data.length) % data.length;
          const isNext = idx === (slide + 1) % data.length;
          const isPrePrev = idx === (slide - 2 + data.length) % data.length;
          const isNextNext = idx === (slide + 2) % data.length;

          return (
              <Slide
                key={idx}
                active={isActive}
                previous={isPrevious}
                prevPrev={isPrePrev}
                next={isNext}
                nextNext={isNextNext}
              >
                <img src={item.src} alt={item.alt} />
              </Slide>
          );
        })}
      </SlidesContainer>
      
      <ControlsWrapper>
        <Arrow onClick={prevItem}>
          <LeftArrow isActive={leftArrowActive} />
        </Arrow>
        <Indicators>
          {data.map((_, idx) => (
            <Indicator
              key={idx}
              active={slide === idx}
              onClick={() => setSlide(idx)}
            />
          ))}
        </Indicators>
        <Arrow onClick={nextItem}>
          <RightArrow isActive={rightArrowActive} />
        </Arrow>
      </ControlsWrapper>
    </CarouselContainer>
  );
};

// Styled-components for the carousel
const CarouselContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

  const SlidesContainer = styled.div`
    display: grid;
    position: relative;
    width: 100%;
    height: 550px;
  `;

  const Slide = styled.div<{
    active: boolean;
    previous: boolean;
    next: boolean;
    prevPrev: boolean;
    nextNext: boolean;
  }>`
    display: ${({ active, previous, next, prevPrev, nextNext }) =>
      active || previous || next || prevPrev || nextNext ? "block" : "none"};
    position: absolute;
    z-index: ${({ active, previous, next }) =>
      active ? 3 : previous || next ? 2 : 1};
  
    top: 50%; /* Center vertically */
    left: ${({ active, previous, next, prevPrev, nextNext }) =>
      active
        ? "50%"
        : previous
        ? "10%"
        : next
        ? "90%"
        : prevPrev
        ? "0%"
        : nextNext
        ? "100%"
        : "50%"}; /* Adjust positions based on roles */
    
    transform: translate(
      ${({ active, previous, prevPrev, next, nextNext }) =>
        active ? "-50%" : previous ? "0" : prevPrev ? "0" : next ? "-100%" : nextNext ? "-100%" : "-50%"},
      -50%
    );

    height: ${({ active, previous, next, prevPrev, nextNext }) =>
      active ? "100%" : previous || next ? "90%" : "80%"}; /* Smaller size for prev-prev and next-next */
  
    img {
      box-shadow: 0px 0px 5px #666;
      height: 100%;
      width: auto;
      transition: height 0.3s ease, transform 0.3s ease;
      transform: ${({ active }) => (active ? "scale(1)" : "scale(0.9)")};
    }
  `;
  
  const ControlsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: -2rem;
  left: 50%;
  transform: translateX(-50%);
  gap: 1rem; 
  z-index: 5;
`;

const Arrow = styled.div`
  width: 1rem;
  height: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Indicators = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const Indicator = styled.button<{ active: boolean }>`
  background-color: ${({ active }) => (active ? "var(--primary)" : "#CCCCCC")};
  height: ${({ active }) => (active ? "0.8rem" : "0.65rem")};
  width: ${({ active }) => (active ? "0.8rem" : "0.65rem")};
  border-radius: 100%;
  border: none;
  outline: none;
  margin: 0 0.2rem;
  cursor: pointer;
`;

const RightArrow: React.FC<{ isActive: boolean }> = ({ isActive }) => {

  return (
    <svg
      width="auto"
      height="100%"
      viewBox="0 0 250 184"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        cursor: "pointer",
        transform: isActive ? "scale(1.2)" : "scale(1)",
        transition: "transform 0.3s ease",
      }}
    >
      <path d="M124.101 178.867L239.622 91.6129M239.622 91.6129H0.707397M239.622 91.6129L124.101 4.89844" stroke="#999999" stroke-width="40"/>
    </svg>
  );
};

const LeftArrow: React.FC<{ isActive: boolean }> = ({ isActive }) => {

  return (
    <svg
      width="auto"
      height="100%"
      viewBox="0 0 250 184"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        cursor: "pointer",
        transform: isActive ? "scale(1.2)" : "scale(1)",
        transition: "transform 0.3s ease",
      }}
    >
      <path d="M126.362 178.867L10.8409 91.6129M10.8409 91.6129H249.756M10.8409 91.6129L126.362 4.89844" stroke="#999999" stroke-width="40"/>
    </svg>
  );
};
