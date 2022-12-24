import {
  Component,
  Show,
  createEffect,
  createSignal,
  mapArray,
  onMount,
} from "solid-js";
import NothingToDisplay from "../common/nothing-to-display/NothingToDisplay";
import { UserData, UserFilesModel } from "../common/models";
import { getUserData, getUserFiles } from "../common/services";
import { useNavigate } from "@solidjs/router";
const [userData, setUserData] = createSignal<UserData>();
const [userFiles, setUserFiles] = createSignal<UserFilesModel[]>();
const [mappeduserFiles, setMappedUserFiles] = createSignal<UserFilesModel[]>();
const [isUnauthorized, setIsUnauthorized] = createSignal<boolean>();
const MyDigitals: Component = () => {
  const navigate = useNavigate();
  createEffect(() => {
    if (isUnauthorized()) {
      navigate("/", { replace: true });
    }
  });
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
          onChange={(e) => {
            let filteredFiles = mappeduserFiles()?.filter((file) => {
              let filesToReturn: UserFilesModel[] = [];
              file.tags.forEach((tag) => {
                if (tag.toLowerCase() === e.currentTarget.value.toLowerCase()) {
                  filesToReturn.push(file);
                }
              });
              return filesToReturn;
            });
            if (filteredFiles !== undefined) {
              setMappedUserFiles(filteredFiles);
            } else {
              setMappedUserFiles(userFiles());
            }
          }}
          aria-describedby="basic-addon1"
        />
      </div>
      <Show
        when={
          mappeduserFiles()?.length === 0 || mappeduserFiles() === undefined
        }
      >
        <NothingToDisplay></NothingToDisplay>
      </Show>
      <div class="file-container container">
        {mapArray(
          () => mappeduserFiles(),
          (filesData) => (
            <div class="row">
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
            </div>
          )
        )}
      </div>
    </div>
  );
};

onMount(async () => {
  let getUserDataResponse = await getUserData();
  const message = getUserDataResponse.message.toLowerCase();
  if (message.includes("expired") || message.includes("unauthorized")) {
    setIsUnauthorized(true);
  } else {
    setIsUnauthorized(false);
    setUserData(getUserDataResponse.data as UserData);
  }
  const response = await getUserFiles(userData()?.userId);
  setUserFiles(response);
  setMappedUserFiles(response);
});
export default MyDigitals;
