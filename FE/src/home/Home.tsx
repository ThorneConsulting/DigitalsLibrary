import { Component, createSignal, mapArray, onMount } from "solid-js";
import AppHeader from "../common/app-header/AppHeader";
import { Outlet, useNavigate } from "@solidjs/router";
import {
  createUserBucket,
  extractTokenFromUrl,
  getUserData,
} from "../common/services";
import { UserData } from "../common/models";
const [userData, setUserData] = createSignal<UserData>();
const sideBarConfig = {
  itemConfig: [
    {
      text: "Home",
      icon: (<i class="bi bi-house-door"></i>) as HTMLElement,
      link: "/home",
    },
    {
      text: "MyFiles",
      icon: (<i class="bi bi-folder"></i>) as HTMLElement,
      link: "/home/my-files",
    },
  ],
};
const headerConfig = () => {
  return (
    <div>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasNavbar"
        aria-controls="offcanvasNavbar"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="offcanvas offcanvas-end"
        tabindex="-1"
        id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel"
      >
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasNavbarLabel">
            My Digitals
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body">
          <div class="container d-flex flex-column align-items-center border-bottom pb-3 mb-3">
            <i class="bi bi-person-circle" style={{ "font-size": "2rem" }}></i>
            <span>Welcome {userData()?.email}</span>
          </div>
          <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
            <li class="nav-item">
              {mapArray(
                () => sideBarConfig.itemConfig,
                (item) => (
                  <a
                    class="nav-link hover-focus-active"
                    aria-current="page"
                    href={item.link}
                  >
                    <div
                      class="container-fluid"
                      style={{
                        "font-size": "large",
                      }}
                    >
                      <span
                        style={{
                          "padding-right": "0.5rem",
                          "font-size": "large",
                        }}
                      >
                        {item.icon}
                      </span>
                      <span>{item.text}</span>
                    </div>
                  </a>
                )
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  ) as HTMLElement;
};
const HomePage: Component = () => {
  return (
    <div
      class="container-sm container-md container-lg d-flex justify-content-center align-items-center"
      style={{ height: "100%", width: "100%" }}
    >
      <AppHeader
        headerConfig={{ title: "My Digitals", headerContent: headerConfig() }}
      ></AppHeader>
      <Outlet></Outlet>
    </div>
  );
};

onMount(async () => {
  await extractTokenFromUrl();

  let getUserDataResponse = await getUserData();
  console.log(getUserDataResponse);
  const message = getUserDataResponse.message.toLowerCase();
  if (message.includes("expired") || message.includes("unauthorized")) {
    console.log(getUserDataResponse);
    window.location.replace("http://localhost:3000/");
  } else {
    setUserData(getUserDataResponse.data as UserData);
  }
  const createUserBucketResponse = await createUserBucket(userData()?.userId);
  console.log(createUserBucketResponse);
});
export default HomePage;
