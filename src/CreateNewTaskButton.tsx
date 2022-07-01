import * as React from "react";
import TaskModal from "./TaskModal";
import { APIS } from "./Types";

export default function CreateNewTaskButton(props: {
  createTask: APIS["createTaskType"];
}) {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <div className="flex-item">
      <button
        onClick={(e) => {
          setShowModal(true);
        }}
      >
        Create New Task
      </button>
      {showModal && (
        <TaskModal
          type="Create"
          createTask={props.createTask}
          onSubmit={() => {
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}
