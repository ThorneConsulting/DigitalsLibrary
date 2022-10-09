import { Component } from "solid-js";

const NothingToDisplay: Component = () => {
  return (
    <div
      class="container d-flex justify-content-center align-items-center"
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <h2>Nothing to display here right now</h2>
    </div>
  );
};

export default NothingToDisplay;
