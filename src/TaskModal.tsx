import * as React from "react";

import { APIS, BoxData, Category } from "./Types";
import Modal from "./Modal";
import EditTaskForm from "./EditTaskForm";

type CreateProps = {
  type: "Create";
  createTask: APIS["createTaskType"];
  initialData?: BoxData;

  onSubmit: () => void; // TODO maybe rename this to be more clear
};

type EditProps = {
  type: "Edit";
  updateTask: APIS["updateTaskType"];
  currentTaskID: number;
  initialData: BoxData;

  onSubmit: () => void;
};

export default function TaskModal(props: CreateProps | EditProps) {
  const [category, setCategory] = React.useState<Category>(
    props.initialData?.category ?? Category.Backlog
  );
  const [title, setTitle] = React.useState<string>(
    props.initialData?.title ?? ""
  );

  const resetForm = () => {
    setCategory(Category.Backlog);
    setTitle("");
  };

  const onSubmit = (event) => {
    if (props.type === "Create") {
      props.createTask(category, title);
    } else {
      props.updateTask(props.currentTaskID, category, title);
    }

    event.preventDefault(); // prevents page from refreshing on submit
    if (props.type === "Create") {
      resetForm();
    }

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
