import Modal from "@suid/material/Modal";
import type { Accessor, Component } from "solid-js";

const ModalComponent: Component<{
  open: Accessor<boolean>;
  content: HTMLElement;
}> = (props) => {
  return (
    <div>
      <Modal
        open={props.open()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {props.content}
      </Modal>
    </div>
  );
};
export default ModalComponent;
