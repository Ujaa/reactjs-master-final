import { useQuery } from "@tanstack/react-query";
import { IMovieDetail, getMovie, makeBgPath, makeImagePath } from "../api";
import { motion } from "framer-motion";
import { styled } from "styled-components";
import { useSetRecoilState } from "recoil";
import { selectedIdState } from "../atom";
import { queryClient } from "../query";
import { ArrowTopRightOnSquareIcon } from "./ArrowIcon";

interface MovieDetailProps {
  id: number;
}

const Wrapper = styled(motion.div)`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Background = styled(motion.div)`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #00000078;
`;

const Dialog = styled(motion.div)`
  position: fixed;
  display: flex;
  justify-content: center;
  z-index: 100;
  background-color: #000000;
  margin: 2rem;
  border-radius: 2rem;
  overflow: hidden;
  height: 85%;
`;

const Content = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 2.8rem 2rem;
  background: linear-gradient(rgba(0, 212, 255, 0), rgba(0, 0, 0, 1));
`;

const Title = styled(motion.h2)`
  font-size: 2.4rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1.2rem;
  display: flex;
  gap: 1rem;
  align-items: flex-end;
  a {
    display: flex;
    margin-bottom: 0.1rem;
  }
`;

const GenreList = styled(motion.ul)`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1rem;
`;

const Genre = styled(motion.li)`
  font-size: 0.8rem;
  color: white;
  border: 1px solid white;
  border-radius: 20rem;
  padding: 0.4rem 0.6rem;
`;

const List = styled(motion.ul)`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem 2rem;
  margin-bottom: 1.2rem;
`;
const LanguageList = styled(motion.ul)`
  display: flex;
  gap: 0.4rem;
  margin-bottom: 0.6rem;
`;

const Language = styled(motion.li)`
  font-size: 0.8rem;
  font-weight: 700;
  color: #000000;
  border: 1px solid white;
  border-radius: 0.4rem;
  padding: 0.15rem 0.3rem;
  background-color: white;
`;

const Status = styled(motion.li)`
  font-size: 0.8rem;
  font-weight: 700;
  color: #000000;
  border: 1px solid white;
  border-radius: 0.4rem;
  padding: 0.15rem 0.3rem;
  background-color: white;
  margin-right: 0.4rem;
`;

const InformationList = styled(motion.ul)`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  font-size: 0.8rem;
  font-weight: 700;
  color: white;
`;

const Information = styled(motion.li)`
  white-space: nowrap;
  font-size: 0.8rem;
  font-weight: 700;
  color: white;
`;

const CompanyList = styled(motion.ul)`
  display: flex;
  gap: 0.6rem;

  flex-wrap: wrap;
`;

const Company = styled(motion.img)`
  height: 1rem;
  filter: grayscale(1) brightness(0%) invert(100%);
`;

const Text = styled(motion.p)`
  font-size: 1.2rem;
  color: white;
  line-height: 140%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 7;
  line-clamp: 7;
  -webkit-box-orient: vertical;
`;

const Image = styled(motion.img)`
  position: absolute;
  width: 100%;
  top: 0;
  object-fit: cover;
  z-index: -1;
`;

const CloseButton = styled(motion.button)`
  background-color: black;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.4rem;
  height: 2.4rem;
  margin-top: 1.2rem;
  border: 1px white solid;
  border-radius: 100%;
  cursor: pointer;
  span {
    position: absolute;
    width: 0.1rem;
    height: 1.2rem;
    background-color: white;
  }
  span:nth-child(1) {
    transform: rotate(45deg);
  }
  span:nth-child(2) {
    transform: rotate(-45deg);
  }
`;

function MovieDetail({ id }: MovieDetailProps) {
  const setSelectedId = useSetRecoilState(selectedIdState);
  const { isLoading, data } = useQuery<IMovieDetail>({
    queryKey: ["movieDetail"],
    queryFn: () => getMovie(id.toString()),
  });

  const onClose = () => {
    queryClient.removeQueries({ queryKey: ["movieDetail"] });
    setSelectedId(null);
  };

  const runtimeToHourAndMinute = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    const hourString = hours < 10 ? "0" + hours : String(hours);
    const minuteString =
      remainingMinutes < 10 ? "0" + remainingMinutes : String(remainingMinutes);

    return `${hourString}h ${minuteString}m`;
  };

  return (
    <Wrapper>
      <Background></Background>

      <Dialog layoutId={id.toString()}>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            <CloseButton onClick={onClose}>
              <span></span> <span></span>
            </CloseButton>
            <Image
              initial={{ opacity: 0, y: -20 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: 2,
                  type: "spring",
                },
              }}
              src={makeBgPath(data!.backdrop_path)}
            />
            <Content
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  delay: 0.5,
                  duration: 2,
                  type: "spring",
                },
              }}
            >
              <LanguageList>
                <Status>{data?.status}</Status>
                {data?.spoken_languages.map((language) => (
                  <Language>{language.iso_639_1}</Language>
                ))}
              </LanguageList>
              <Title>
                {data?.title}
                <a href={data?.homepage} target="_blank" rel="noreferrer">
                  <ArrowTopRightOnSquareIcon color={"white"} width={"1.6rem"} />
                </a>
              </Title>

              <GenreList>
                {data?.genres.map((genre) => (
                  <Genre>{genre.name}</Genre>
                ))}
              </GenreList>
              <List>
                <InformationList>
                  <Information>
                    {runtimeToHourAndMinute(data?.runtime ?? 0)}
                  </Information>
                  |
                  <Information>
                    ★ {Math.floor(data?.vote_average ?? 0)}
                  </Information>
                  |<Information>{data?.release_date}</Information>
                </InformationList>

                <CompanyList>
                  {data?.production_companies.map((company) =>
                    company.logo_path && company.logo_path !== "" ? (
                      <Company
                        src={makeImagePath(company.logo_path)}
                        alt={company.name}
                      />
                    ) : (
                      <Information>{company.name}</Information>
                    )
                  )}
                </CompanyList>
              </List>

              <Text>{data?.overview}</Text>
            </Content>
          </>
        )}
      </Dialog>
    </Wrapper>
  );
}

export default MovieDetail;
