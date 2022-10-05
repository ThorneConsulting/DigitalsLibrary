import { Component, lazy } from "solid-js";
import { Routes, Route } from "@solidjs/router";
import logo from "./logo.svg";
import styles from "./App.module.scss";
const UploadFiles = lazy(() => import("./upload-files-page/UploadFiles"));
const Home = lazy(() => import("./home/Home"));
const LandingPage = lazy(() => import("./landing-page/LandingPage"));
const MyDigitalsPage = lazy(() => import("./my-digitals-page/MyDigitals"));
const App: Component = () => {
  return (
    <Routes>
      <Route path="/" component={LandingPage}></Route>
      <Route path="/home" component={Home}>
        <Route path="/" component={UploadFiles}></Route>
        <Route path="/my-files" component={MyDigitalsPage}></Route>
      </Route>
    </Routes>
  );
};

export default App;
