import { Component } from "solid-js";

const Loading: Component = () => {
  return (
    <div
      class="container d-flex justify-content-center align-items-center"
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <div
        class="spinner-border text-primary"
        style="width: 3rem; height: 3rem;"
        role="status"
      >
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
