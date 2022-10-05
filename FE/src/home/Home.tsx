import { Component } from "solid-js";
import AppHeader from "../common/app-header/AppHeader";
import { Outlet } from "@solidjs/router";
import styles from "./Home.module.scss";
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
    <div class={styles.container}>
      <AppHeader sidebarItems={sideBarConfig}></AppHeader>
      <Outlet></Outlet>
    </div>
  );
};

export default HomePage;
