import { Component } from "solid-js";
interface LoadingButtonProps {
  buttonLabel: string;
}
const LoadingButton: Component<LoadingButtonProps> = (props) => {
  return (
    <div
      class="container d-flex justify-content-center align-items-center"
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <button class="btn btn-primary" type="button" disabled>
        {props.buttonLabel}
        <span
          class="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
      </button>
    </div>
  );
};

export default LoadingButton;
