import { Component } from "solid-js";
import NothingToDisplay from "../common/nothing-to-display/NothingToDisplay";

const MyDigitals: Component = () => {
  return (
    <div
      class="container"
      style={{ padding: "5rem", height: "100%", width: "100%" }}
    >
      <div class="input-group">
        <span class="input-group-text" id="basic-addon1">
          <i class="bi bi-search"></i>
        </span>
        <input
          class="form-control"
          type="search"
          value="Search......."
          id="example-search-input"
          aria-describedby="basic-addon1"
        />
      </div>
      <NothingToDisplay></NothingToDisplay>
    </div>
  );
};

export default MyDigitals;
