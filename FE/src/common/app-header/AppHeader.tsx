import { Component, mapArray } from "solid-js";
import { createSignal } from "solid-js";
const [open, setOpen] = createSignal(false);

type SideBarConfig = {
  itemConfig: ItemConfig[];
};

type ItemConfig = {
  text: string;
  icon: HTMLElement;
  link: string;
};
const AppHeader: Component<{ sidebarItems: SideBarConfig }> = (props) => {
  return (
    <header>
      <nav class="navbar bg-light fixed-top">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            My Digitals
          </a>
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
              <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li class="nav-item">
                  {mapArray(
                    () => props.sidebarItems.itemConfig,
                    (item: ItemConfig) => (
                      <a
                        class="nav-link active"
                        aria-current="page"
                        href={item.link}
                      >
                        {item.icon}
                        {item.text}
                      </a>
                    )
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

const toggleDrawer = () => (event: MouseEvent | KeyboardEvent) => {
  if (event.type === "keydown") {
    const keyboardEvent = event as KeyboardEvent;
    if (keyboardEvent.key === "Tab" || keyboardEvent.key === "Shift") return;
  }
  setOpen(!open());
};
export default AppHeader;
