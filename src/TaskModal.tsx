import * as React from "react";

import { APIS, Category } from "./Types";
import Modal from "./Modal";
import EditTaskForm from "./EditTaskForm";

type CreateProps = {
  type: "Create";
  createTask: APIS["createTaskType"];

  onSubmit: () => void; // TODO maybe rename this to be more clear
};

type EditProps = {
  type: "Edit";
  updateTaskCategory: APIS["updateTaskCategoryType"];
  updateTaskTitle: APIS["updateTaskTitleType"];
  currentTaskID: number;

  onSubmit: () => void;
};

export default function TaskModal(props: CreateProps | EditProps) {
  const [category, setCategory] = React.useState<Category>(Category.Backlog);
  const [title, setTitle] = React.useState<string>("");

  const resetForm = () => {
    setCategory(Category.Backlog);
    setTitle("");
  };

  const onSubmit = (event) => {
    if (props.type === "Create") {
      props.createTask(category, title);
    } else {
      props.updateTaskCategory(props.currentTaskID, category);
      props.updateTaskTitle(props.currentTaskID, title);
    }

    event.preventDefault(); // prevents page from refreshing on submit
    resetForm();

    props.onSubmit();
  };

  const onClose = (event) => {
    resetForm();

    props.onSubmit();
  };

  return (
    <Modal onClose={onClose}>
      <EditTaskForm
        currentCategory={category}
        onCategoryChange={(cat) => setCategory(cat)}
        currentTitle={title}
        onTitleChange={(ti) => setTitle(ti)}
        onFormSubmit={onSubmit}
      />
    </Modal>
  );
}
