import { useQuery } from "@tanstack/react-query";
import { IAPIResponse, getComingSoon } from "../api";
import { styled } from "styled-components";
import Movie from "../components/Movie";
import Movies from "../components/Movies";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

function ComingSoon() {
  const { isLoading, data } = useQuery<IAPIResponse>({
    queryKey: ["comingSoonMovies"],
    queryFn: getComingSoon,
  });
  return (
    <Wrapper>
      {isLoading ? <div>Loading...</div> : <Movies movies={data!.results} />}
    </Wrapper>
  );
}

export default ComingSoon;
