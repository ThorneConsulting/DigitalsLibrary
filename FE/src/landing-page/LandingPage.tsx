import { Component } from "solid-js";
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
  "https://my-digi-lab.auth.ap-southeast-2.amazoncognito.com/login?client_id=1geodasbkgprokukl0fmo12dei&response_type=token&scope=email+openid&redirect_uri=https%3A%2F%2Fd363boo6l83qtq.cloudfront.net%2Fhome";
const LandingPage: Component = () => {
  return (
    <div style={{ height: "100%", width: "100%" }}>
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
      <div
        class="container"
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        <br />
        <div
          class="container d-flex justify-content-center align-items-center"
          style={{
            width: "100%",
            height: "30%",
          }}
        >
          <h2>
            Store and save your craft work easily with MyDigitals online app
          </h2>
        </div>
        <br />
        <hr style={{ width: "100%" }} />
        <div class="pricing-container d-flex justify-content-center align-items-center">
          <h2>Pricing</h2>
        </div>
        <div
          class="container d-flex justify-content-center align-items-center"
          style={{ width: "100%", height: "50%" }}
        >
          <div class="row">
            <div class="col-4">
              <CardComponent
                cardContent={cardContent()}
                cardActionsContent={cardActionsContent()}
                cardTitle="$0.00"
              ></CardComponent>
            </div>
            <div class="col-4">
              <CardComponent
                cardContent={cardContent()}
                cardActionsContent={cardActionsContent()}
                cardTitle="$10.00"
              ></CardComponent>
            </div>
            <div class="col-4">
              <CardComponent
                cardContent={cardContent()}
                cardActionsContent={cardActionsContent()}
                cardTitle="$20.00"
              ></CardComponent>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <footer class="py-3 my-4">
          <ul class="nav justify-content-center border-bottom pb-3 mb-3">
            <li class="nav-item">
              <a href="#" class="nav-link px-2 text-muted">
                Home
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link px-2 text-muted">
                Features
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link px-2 text-muted">
                Pricing
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link px-2 text-muted">
                FAQs
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link px-2 text-muted">
                About
              </a>
            </li>
          </ul>
          <p class="text-center text-muted">
            &copy; MyDigitals v 1.0.0 2022 Company, Inc
          </p>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
