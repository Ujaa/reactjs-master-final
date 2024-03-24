import { useQuery } from "@tanstack/react-query";
import { IAPIResponse, IMovieDetail, getMovie } from "../api";
import { motion } from "framer-motion";
import { styled } from "styled-components";

interface MovieDetailProps {
  id: string;
  onClick: () => void;
}

const Wrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  z-index: 100;
  background-color: #0e0d0da0;
  padding: 2rem;
`;

const Title = styled.h2`
  font-size: 2rem;
  color: white;
`;

function MovieDetail({ id, onClick }: MovieDetailProps) {
  const { isLoading, data } = useQuery<IMovieDetail>({
    queryKey: ["movieDetail"],
    queryFn: () => getMovie(id),
  });
  console.log(data);
  return (
    <Wrapper>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <motion.div layoutId={id.toString()}>
          <motion.button onClick={onClick}>close</motion.button>
          <Title>{data?.release_date}</Title>
          <Title>{data?.vote_average}</Title>
          <Title>{data?.spoken_languages.toString()}</Title>
          <Title>{data?.runtime}</Title>
          <Title>{data?.title}</Title>
          <Title>{data?.status}</Title>
          <Title>{data?.budget}</Title>
          <Title>{data?.genres.toString()}</Title>
          <Title>{data?.homepage}</Title>
          <Title>{data?.overview}</Title>
          <Title>{data?.production_companies.toString()}</Title>
          <Title>{data?.production_countries.toString()}</Title>
        </motion.div>
      )}
    </Wrapper>
  );
}

export default MovieDetail;
