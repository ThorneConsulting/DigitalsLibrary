import { Component } from "solid-js";
import AppFooter from "../common/app-footer/AppFooter";
import AppHeader from "../common/app-header/AppHeader";
import CardComponent from "../common/card/Card";

const cardContent = () => {
  return (
    <ul>
      <li class="nav-item">
        <a href="#" class="nav-link px-2 text-muted">
          Unlimited S3 storage
        </a>
      </li>
      <li class="nav-item">
        <a href="#" class="nav-link px-2 text-muted">
          Feature 2
        </a>
      </li>
      <li class="nav-item">
        <a href="#" class="nav-link px-2 text-muted">
          Feature 3
        </a>
      </li>
      <li class="nav-item">
        <a href="#" class="nav-link px-2 text-muted">
          Feature 4
        </a>
      </li>
      <li class="nav-item">
        <a href="#" class="nav-link px-2 text-muted">
          Feature 5
        </a>
      </li>
    </ul>
  ) as HTMLElement;
};
const cardMediaContent = {
  image: "https://mui.com/static/images/cards/live-from-space.jpg",
  alt: "Card image",
};
const headerContent = () => {
  return (
    <button type="button" class="btn btn-primary" onClick={navigateToLoginPage}>
      Login / Sign up
    </button>
  ) as HTMLElement;
};
const cardActionsContent = () => {
  return (
    <a href="#" class="btn btn-primary">
      Learn More
    </a>
  ) as HTMLElement;
};
const navigateToLoginPage = () => {
  window.open(loginLink, "_self");
};
const loginLink =
  "https://mydigitals.auth.ap-southeast-2.amazoncognito.com/login?client_id=1m4ncral85fg9f6quihiqcqpbi&response_type=token&scope=email+openid&redirect_uri=https%3A%2F%2Fd363boo6l83qtq.cloudfront.net%2Fhome";
const LandingPage: Component = () => {
  return (
    <div
      class="container"
      style={{ height: "100%", width: "100%", padding: "5rem" }}
    >
      <AppHeader
        headerConfig={{ title: "My Digitals", headerContent: headerContent() }}
      ></AppHeader>
      <div
        class="container-sm container-md container-lg"
        style={{ height: "100%", width: "100%" }}
      >
        <br />
        <div class="container-fluid d-flex justify-content-center align-items-center">
          <h2>
            Store and save your craft work easily with MyDigitals online app
          </h2>
        </div>
        <br />
        <hr style={{ width: "100%" }} />
        <div class="pricing-container d-flex justify-content-center align-items-center">
          <h2>Pricing</h2>
        </div>
        <div class="container-sm container-md container-lg d-flex flex-column justify-content-center align-items-center">
          <div class="container-fluid d-flex">
            <div class="col-sm-4 col-md-4 col-lg-4 p-2">
              <CardComponent
                cardContent={cardContent()}
                cardActionsContent={cardActionsContent()}
                cardTitle="$0.00"
              ></CardComponent>
            </div>
            <div class="col-sm-4 col-md-4 col-lg-4 p-2">
              <CardComponent
                cardContent={cardContent()}
                cardActionsContent={cardActionsContent()}
                cardTitle="$10.00"
              ></CardComponent>
            </div>
            <div class="col-sm-4 col-md-4 col-lg-4 p-2">
              <CardComponent
                cardContent={cardContent()}
                cardActionsContent={cardActionsContent()}
                cardTitle="$20.00"
              ></CardComponent>
            </div>
          </div>
        </div>
      </div>
      <AppFooter></AppFooter>
    </div>
  );
};

export default LandingPage;
