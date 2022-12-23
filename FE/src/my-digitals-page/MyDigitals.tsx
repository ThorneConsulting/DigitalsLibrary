import { Component, createSignal, onMount } from "solid-js";
import NothingToDisplay from "../common/nothing-to-display/NothingToDisplay";
import { UserData } from "../common/models";
import { getUserData, getUserFiles } from "../common/services";
const [userData, setUserData] = createSignal<UserData>();
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

onMount(async () => {
  let getUserDataResponse = await getUserData();
  console.log(getUserDataResponse);
  const message = getUserDataResponse.message.toLowerCase();
  if (message.includes("expired") || message.includes("unauthorized")) {
    console.log(getUserDataResponse);
  } else {
    setUserData(getUserDataResponse.data as UserData);
  }
  const response = getUserFiles(userData()?.userId);
});
export default MyDigitals;
