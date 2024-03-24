import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { Helmet } from "react-helmet";

function App() {
  return (
    <>
      <Helmet>
        <title>Hi! This is Test!</title>
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com"></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        ></link>
      </Helmet>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
