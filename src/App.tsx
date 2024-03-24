import { Helmet } from "react-helmet";
import Header from "./components/global/Header";
import { Outlet } from "react-router-dom";
import Scene from "./components/3d/Scene";
import { useRecoilValue } from "recoil";
import { televisionClickedState } from "./atom";

function App() {
  const isClicked = useRecoilValue(televisionClickedState);

  return (
    <>
      <Helmet>
        <title>Movies</title>
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com"></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        ></link>
      </Helmet>
      {isClicked! && <Header />}
      {isClicked ? <Outlet /> : <Scene />}
    </>
  );
}

export default App;
