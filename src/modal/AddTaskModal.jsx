import React from "react";
import Modal from "react-modal";
import { TaskDetail } from "../components/tasks/TaskDetail";
import Button from "@material-ui/core/Button";

export const AddTaskModal = ({ showTask, closeModal }) => {
  return (
    <Modal
      isOpen={true}
      onRequestClose={closeModal}
      ariaHideApp={false}
      className="ReactModal__Overlay"
    >
      <div className="ReactModal__Content">
        <Button className="close-modal" onClick={closeModal}>
          X
        </Button>
        <TaskDetail showTask={showTask} />
      </div>
    </Modal>
  );
};
