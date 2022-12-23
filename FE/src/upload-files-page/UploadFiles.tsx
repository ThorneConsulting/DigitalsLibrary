import { Component, createSignal, onMount } from "solid-js";
import { getUserData, uploadFiles } from "../common/services";
import { UserData } from "../common/models";
const [isModalOpen, setIsModalOpen] = createSignal(false);
const [files, setFiles] = createSignal();
const [userData, setUserData] = createSignal<UserData>();
const closeModal = () => {
  setIsModalOpen(false);
};
const dropEvent = (e: Event) => {
  console.log(e.target);
};
const inputChangeHandler = (e: Event) => {
  const inputElement = e.target as HTMLInputElement;
  const filesToUpload = inputElement.files;
  console.log(filesToUpload);
  if (filesToUpload)
    for (let fileNumber = 0; fileNumber < filesToUpload.length; fileNumber++) {
      setFiles(filesToUpload.item(fileNumber));
    }
};

const uploadClickHandler = async () => {
  console.log(files());
  await uploadFiles(userData()?.userId, files());
};
const modalContent = () => {
  return (<div></div>) as HTMLElement;
};

const UploadFiles: Component = () => {
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
        <button
          type="button"
          class="btn btn-primary"
          onClick={uploadClickHandler}
        >
          Upload
        </button>
        <br />
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
});
const toggelModal = () => {
  setIsModalOpen(!isModalOpen());
  console.log(isModalOpen());
};

export default UploadFiles;
