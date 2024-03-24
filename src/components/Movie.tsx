import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { makeImagePath } from "../api";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";

interface MovieProps {
  id: number;
  title: string;
  posterPath: string;
  onClick: () => void;
}

const variants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.05,
  },
};

const imageVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.2,
    filter: "blur(4px) brightness(40%)",
  },
};

const MovieItem = styled(motion.li)`
  position: relative;
  border-radius: 0.8rem;
  overflow: hidden;
  width: 14rem;
  height: 20rem;
  &:hover {
    z-index: 10;
  }
`;

const Title = styled(motion.span)`
  position: absolute;
  z-index: 2;
  font-size: 2rem;
  color: white;
`;

const Image = styled(motion.img)`
  width: 100%;
  object-fit: cover;
`;

function Movie({ id, title, posterPath, onClick }: MovieProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleHoverStart = () => {
    setIsHovered(true);
  };

  const handleHoverEnd = () => {
    setIsHovered(false);
  };

  return (
    <MovieItem
      onClick={onClick}
      layoutId={id.toString()}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      whileHover="hover"
      initial="normal"
      variants={variants}
    >
      {isHovered && <Title onHoverStart={handleHoverStart}>{title}</Title>}
      <Image
        whileHover="hover"
        initial="normal"
        variants={imageVariants}
        src={makeImagePath(posterPath)}
        alt={title}
      />
    </MovieItem>
  );
}

export default Movie;
