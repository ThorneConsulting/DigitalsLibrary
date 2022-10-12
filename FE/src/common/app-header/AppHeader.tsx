import { Component, mapArray } from "solid-js";
import { createSignal } from "solid-js";
const [open, setOpen] = createSignal(false);

// type SideBarConfig = {
//   itemConfig: ItemConfig[];
// };

// type ItemConfig = {
//   text: string;
//   icon: HTMLElement;
//   link: string;
// };

// type HeaderContent = {
//   type: string,
//   isDisabled: boolean

// }
type HeaderConfig = {
  title: string;
  headerContent?: HTMLElement;
};

const AppHeader: Component<{ headerConfig: HeaderConfig }> = (props) => {
  return (
    <header>
      <nav class="navbar bg-light fixed-top ">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            {props.headerConfig.title}
          </a>
          {props.headerConfig.headerContent}
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
