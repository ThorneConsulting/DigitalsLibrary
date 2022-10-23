import { Component, createSignal } from "solid-js";
import { onMount } from "solid-js";
const [isModalOpen, setIsModalOpen] = createSignal(false);
const [files, setFiles] = createSignal();
const closeModal = () => {
  setIsModalOpen(false);
};
const dropEvent = (e: Event) => {
  console.log(e.target);
};
const inputChangeHandler = (e: Event) => {
  const inputElement = e.target as HTMLInputElement;
  const filesToUpload = inputElement.files;
  if (filesToUpload)
    for (let fileNumber = 0; fileNumber < filesToUpload.length; fileNumber++) {
      setFiles(filesToUpload.item(fileNumber));
    }
};

const uploadClickHandler = () => {
  console.log(files());
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
  const authToken = location.hash
    .split("#")[1]
    .split("=")[1]
    .split("access_token")[0]
    .substring(0, 1038);
  console.log(authToken);
  document.cookie = `token=${authToken}`;

  const response = (
    await fetch(
      "https://dxe7tgo401.execute-api.ap-southeast-2.amazonaws.com/dev/user-data",
      { headers: { Authorization: authToken }, method: "GET" }
    )
  ).json();
  const userData = await response;
  console.log(userData);
});
const toggelModal = () => {
  setIsModalOpen(!isModalOpen());
  console.log(isModalOpen());
};

export default UploadFiles;
