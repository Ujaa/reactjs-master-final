import { useQuery } from "@tanstack/react-query";
import { IAPIResponse, getPopular } from "../api";
import { styled } from "styled-components";
import Movies from "../components/Movies";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

function Popular() {
  const { isLoading, data } = useQuery<IAPIResponse>({
    queryKey: ["popularMovies"],
    queryFn: getPopular,
  });
  return (
    <Wrapper>
      {isLoading ? <div>Loading...</div> : <Movies movies={data!.results} />}
    </Wrapper>
  );
}

export default Popular;
