import { Component, Show, createEffect, createSignal, onMount } from "solid-js";
import { getUserData, uploadFiles } from "../common/services";
import { UserData } from "../common/models";
import { useNavigate } from "@solidjs/router";
import LoadingButton from "../common/loading-botton/LoadingButton";
import sha256 from "crypto-js/sha256";
import Base64 from "crypto-js/enc-base64";

const [isModalOpen, setIsModalOpen] = createSignal(false);
const [files, setFiles] = createSignal<File>();
const [userData, setUserData] = createSignal<UserData>();
const [isUnauthorized, setIsUnauthorized] = createSignal<boolean>();
const [isLoading, setIsLoading] = createSignal<boolean>();
const closeModal = () => {
  setIsModalOpen(false);
};
const dropEvent = (e: Event) => {
  console.log(e.target);
};
const inputChangeHandler = (e: Event) => {
  const inputElement = e.target as HTMLInputElement;
  const filesToUpload = inputElement.files;
  if (filesToUpload && filesToUpload.length > 0)
    for (let fileNumber = 0; fileNumber < filesToUpload.length; fileNumber++) {
      setFiles(filesToUpload[fileNumber]);
    }
};

const uploadClickHandler = async () => {
  setIsLoading(true);
  const READER = new FileReader();
  READER.readAsText(files() as Blob);
  let hashString: string;
  READER.onloadend = (event) => {
    if (event.target?.readyState === FileReader.DONE) {
      hashString = READER.result?.valueOf().toString() ?? "";
      const HEX_VALUE = Base64.stringify(sha256(hashString));
      uploadFiles(userData()?.userId, files(), HEX_VALUE).finally(() =>
        setIsLoading(false)
      );
    }
  };
  READER.onerror = (event) => {
    console.log("ERROR", event);
  };
};
const modalContent = () => {
  return (<div></div>) as HTMLElement;
};

const UploadFiles: Component = () => {
  const navigate = useNavigate();
  createEffect(() => {
    if (isUnauthorized()) {
      navigate("/", { replace: true });
    }
  });
  return (
    <div class="container-sm container-md container-lg d-flex justify-content-center align-items-center">
      <div
        class="container-sm container-md container-lg d-flex flex-column justify-content-center align-items-center"
        style={{
          border: "0.1 rem",
          "border-style": "dashed",
          display: "",
        }}
        ondrop={dropEvent}
      >
        <div class="icon-container" style={{ "font-size": "10rem" }}>
          <i class="bi bi-cloud-upload-fill"></i>
        </div>
        <span> Drag and drop files here or click "Choose a file"</span>
        <div class="container-fluid d-flex justify-content-center align-items-center p-2">
          <input
            type="file"
            accept=".pdf, .png, .jpg"
            multiple
            onChange={inputChangeHandler}
            value="
          Choose a file"
          />
        </div>
        <Show when={!isLoading()}>
          <button
            type="button"
            class="btn btn-primary"
            onClick={uploadClickHandler}
          >
            Upload
          </button>
        </Show>
        <Show when={isLoading()}>
          <LoadingButton buttonLabel="Uploading...."></LoadingButton>
        </Show>
        <br />
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
});
const toggelModal = () => {
  setIsModalOpen(!isModalOpen());
};

export default UploadFiles;
