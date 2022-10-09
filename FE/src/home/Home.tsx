import { Component, createSignal } from "solid-js";
import AppHeader from "../common/app-header/AppHeader";
import { Outlet } from "@solidjs/router";
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
const HomePage: Component = () => {
  return (
    <div
      class="container d-flex justify-content-center align-items-center"
      style={{ height: "100%", width: "100%" }}
    >
      <AppHeader sidebarItems={sideBarConfig}></AppHeader>
      <Outlet></Outlet>
    </div>
  );
};

export default HomePage;
