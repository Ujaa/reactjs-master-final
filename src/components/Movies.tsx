import styled from "styled-components";
import { IMovie } from "../api";
import { AnimatePresence, motion } from "framer-motion";
import Movie from "./Movie";
import { useState } from "react";
import MovieDetail from "./MovieDetail";

interface MoviesProps {
  movies: IMovie[];
}

const variants = {
  normal: {
    scale: 1,
  },
};

const MovieList = styled(motion.ul)`
  max-width: 1080px;
  margin: 0 0.8rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  padding: 5.2rem 0;
`;

function Movies({ movies }: MoviesProps) {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <>
      <MovieList
        initial="normal"
        variants={variants}
        transition={{ type: "tween" }}
      >
        {movies.map((movie) => (
          <Movie
            key={movie.id}
            id={movie.id}
            title={movie.title}
            posterPath={movie.poster_path}
            onClick={() => setSelectedId(movie.id)}
          ></Movie>
        ))}
      </MovieList>
      <AnimatePresence>
        {selectedId && (
          <MovieDetail
            id={selectedId.toString()}
            onClick={() => setSelectedId(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default Movies;
