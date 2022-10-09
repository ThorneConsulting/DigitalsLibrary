import { Component, createSignal } from "solid-js";
import styles from "./UploadFiles.module.scss";
import ModalComponent from "../common/modal/Modal";
const [isModalOpen, setIsModalOpen] = createSignal(false);
const [files, setFiles] = createSignal();
const closeModal = () => {
  setIsModalOpen(false);
};
const dropEvent = (e: Event) => {
  console.log(e.target);
};
const inputChangeHandler = (e: Event) => {
  var inputElement = e.target as HTMLInputElement;
  console.log(inputElement.files);
  console.log(window.location.href);
  console.log(location);
};
const modalContent = () => {
  return (<div></div>) as HTMLElement;
};

const UploadFiles: Component = () => {
  return (
    <div
      class="container d-flex justify-content-center align-items-center"
      style={{ height: "100%", width: "100%" }}
    >
      <div
        class="container d-flex flex-column justify-content-center align-items-center"
        style={{ border: "0.1 rem", "border-style": "dashed" }}
        ondrop={dropEvent}
      >
        <div class={styles.iconContainer}>
          <i class="bi bi-cloud-upload-fill"></i>
        </div>
        <span> Drag and drop files here or click "Choose a file"</span>
        <input
          type="file"
          accept=".pdf, .png, .jpg"
          multiple
          onChange={inputChangeHandler}
        >
          Choose a file
        </input>
        <button
          type="button"
          class="btn btn-primary"
          onClick={inputChangeHandler}
        >
          Upload
        </button>
        <br />
      </div>
    </div>
  );
};
const toggelModal = () => {
  setIsModalOpen(!isModalOpen());
  console.log(isModalOpen());
};

export default UploadFiles;
