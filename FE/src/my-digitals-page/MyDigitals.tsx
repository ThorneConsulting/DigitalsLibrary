import { Component, Show, createSignal, mapArray, onMount } from "solid-js";
import NothingToDisplay from "../common/nothing-to-display/NothingToDisplay";
import { UserData, UserFilesModel } from "../common/models";
import { getUserData, getUserFiles } from "../common/services";
const [userData, setUserData] = createSignal<UserData>();
const [userFiles, setUserFiles] = createSignal<UserFilesModel[]>();
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
      <Show when={userFiles()?.length === 0}>
        <NothingToDisplay></NothingToDisplay>
      </Show>
      <div class="file-container container">
        {mapArray(
          () => userFiles(),
          (filesData) => (
            <div class="file flex-column">
              <a
                class="nav-link hover-focus-active"
                aria-current="page"
                href={filesData.s3Url}
              >
                <div class="file-container" style={{ "font-size": "5rem" }}>
                  <i class="bi bi-image-fill"></i>
                </div>
                {filesData.fileName}
              </a>
            </div>
          )
        )}
      </div>
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
  const response = await getUserFiles(userData()?.userId);
  setUserFiles(response);
});
export default MyDigitals;
