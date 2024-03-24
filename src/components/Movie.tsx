import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { makeImagePath } from "../api";
import {
  Variants,
  motion,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";
import { useSetRecoilState } from "recoil";
import { selectedIdState } from "../atom";

interface MovieProps {
  id: number;
  title: string;
  posterPath: string;
}

const movieVariants: Variants = {
  start: { y: 50, opacity: 0 },
  end: {
    y: 0,
    opacity: 1,
  },
};
const imageVariants: Variants = {
  initial: {
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
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const Title = styled(motion.span)`
  position: absolute;
  z-index: 2;
  font-size: 2rem;
  color: white;
  padding: 1.2rem;
`;

const Image = styled(motion.img)`
  width: 100%;
  object-fit: cover;
`;

function Movie({ id, title, posterPath }: MovieProps) {
  const setSelectedId = useSetRecoilState(selectedIdState);
  const [isHovered, setIsHovered] = useState(false);

  const onClickMovie = () => {
    setSelectedId(id);
  };

  const handleHoverStart = () => {
    setIsHovered(true);
  };

  const handleHoverEnd = () => {
    setIsHovered(false);
  };

  return (
    <MovieItem
      layoutId={id.toString()}
      onClick={onClickMovie}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      variants={movieVariants}
    >
      {isHovered && <Title onHoverStart={handleHoverStart}>{title}</Title>}
      <Image
        whileHover="hover"
        initial="initial"
        variants={imageVariants}
        src={makeImagePath(posterPath)}
        alt={title}
      />
    </MovieItem>
  );
}

export default Movie;
