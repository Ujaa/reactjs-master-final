import { motion } from "framer-motion";
import { useMatch } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  position: fixed;
  z-index: 100;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.2rem 0;
  background: linear-gradient(#121113, rgba(0, 212, 255, 0));
`;

const Navigation = styled.ul`
  display: flex;
  align-items: flex-start;
  gap: 3.2rem;
`;

const NavigationItem = styled.li`
  font-size: 1.2rem;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  a {
    color: white;
  }
`;

const Circle = styled(motion.span)`
  width: 0.4rem;
  height: 0.4rem;
  background-color: white;
  border-radius: 100%;
`;

function Header() {
  const popularMatch = useMatch("/");
  const comingSoonMatch = useMatch("coming-soon");
  const nowPlayingMatch = useMatch("now-playing");

  return (
    <Wrapper>
      <Navigation>
        <NavigationItem>
          <Link to={"/"}>Popular</Link>
          {popularMatch && <Circle layoutId="circle" />}
        </NavigationItem>
        <NavigationItem>
          <Link to={"coming-soon"}>Coming Soon</Link>
          {comingSoonMatch && <Circle layoutId="circle" />}
        </NavigationItem>
        <NavigationItem>
          <Link to={"now-playing"}>Now Playing</Link>
          {nowPlayingMatch && <Circle layoutId="circle" />}
        </NavigationItem>
      </Navigation>
    </Wrapper>
  );
}

export default Header;
