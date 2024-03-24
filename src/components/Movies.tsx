import styled from "styled-components";
import { IMovie } from "../api";
import { AnimatePresence, motion } from "framer-motion";
import Movie from "./Movie";
import MovieDetail from "./MovieDetail";
import { useRecoilValue } from "recoil";
import { selectedIdState } from "../atom";

interface MoviesProps {
  movies: IMovie[];
}

const movieListVariants = {
  start: {
    opacity: 0,
  },
  end: {
    opacity: 1,
    transition: {
      type: "spring",
      staggerChildren: 0.1,
    },
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
  const selectedId = useRecoilValue(selectedIdState);

  return (
    <>
      <MovieList initial="start" animate="end" variants={movieListVariants}>
        {movies.map((movie) => (
          <Movie
            key={movie.id}
            id={movie.id}
            title={movie.title}
            posterPath={movie.poster_path}
          ></Movie>
        ))}
      </MovieList>
      <AnimatePresence>
        {selectedId && <MovieDetail id={selectedId} />}
      </AnimatePresence>
    </>
  );
}

export default Movies;
