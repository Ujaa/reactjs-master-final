import { useQuery } from "@tanstack/react-query";
import { IAPIResponse, getNowPlaying } from "../api";
import { styled } from "styled-components";
import Movies from "../components/Movies";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

function NowPlaying() {
  const { isLoading, data } = useQuery<IAPIResponse>({
    queryKey: ["nowPlayingMovies"],
    queryFn: getNowPlaying,
  });
  return (
    <Wrapper>
      {isLoading ? <div>Loading...</div> : <Movies movies={data!.results} />}
    </Wrapper>
  );
}

export default NowPlaying;
