import { Component } from "solid-js";
import AppHeader from "../common/app-header/AppHeader";
import CardComponent from "../common/card/Card";
import styles from "./LandingPage.module.css";

const cardContent =
  "Some quick example text to build on the card title and make up the bulk of the card's content.";
const cardMediaContent = {
  image: "https://mui.com/static/images/cards/live-from-space.jpg",
  alt: "Card image",
};

const cardActionsContent = () => {
  return (
    <a href="#" class="btn btn-primary">
      Go somewhere
    </a>
  ) as HTMLElement;
};
const navigateToLoginPage = () => {
  window.open(loginLink, "_self");
};
const loginLink =
  "https://my-digi-lab.auth.ap-southeast-2.amazoncognito.com/login?client_id=1geodasbkgprokukl0fmo12dei&response_type=token&scope=email+openid&redirect_uri=https%3A%2F%2Fexample.com";
const LandingPage: Component = () => {
  return (
    <div class={styles.landingPageContainer} id="landing-page">
      <header>
        <nav class="navbar bg-light">
          <div class="container-fluid">
            <span class="navbar-brand mb-0 h1">My Digitals</span>
            <button
              type="button"
              class="btn btn-primary"
              onClick={navigateToLoginPage}
            >
              Login / Sign up
            </button>
          </div>
        </nav>
      </header>
      <br />
      <div class="container">
        <div class="row">
          <div class="col-4">
            <CardComponent
              cardContent={cardContent}
              cardMediaContent={cardMediaContent}
              cardActionsContent={cardActionsContent()}
              cardTitle="Dummy Card"
            ></CardComponent>
          </div>
          <div class="col-4">
            <CardComponent
              cardContent={cardContent}
              cardMediaContent={cardMediaContent}
              cardActionsContent={cardActionsContent()}
              cardTitle="Dummy Card"
            ></CardComponent>
          </div>
          <div class="col-4">
            <CardComponent
              cardContent={cardContent}
              cardMediaContent={cardMediaContent}
              cardActionsContent={cardActionsContent()}
              cardTitle="Dummy Card"
            ></CardComponent>
          </div>
        </div>
      </div>
      <br />
      <div class="container-fluid">Some Container content</div>
    </div>
  );
};

export default LandingPage;
