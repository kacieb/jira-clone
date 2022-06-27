import * as React from "react";

import { APIS, Category } from "./Types";
import Modal from "./Modal";

export default function NewTaskModal(props: {
  createTask: APIS["createTaskType"];
}) {
  const [category, setCategory] = React.useState<Category>(Category.Backlog);
  const [title, setTitle] = React.useState<string>("");
  const [showModal, setShowModal] = React.useState<Boolean>(false);

  const resetForm = () => {
    setCategory(Category.Backlog);
    setTitle("");
  };

  const onSubmit = (event) => {
    props.createTask(category, title);
    event.preventDefault(); // prevents page from refreshing on submit
    setShowModal(false);
    resetForm();
  };

  const onClose = (event) => {
    setShowModal(false);
    resetForm();
  };

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
        <Modal onClose={onClose}>
          <form onSubmit={onSubmit}>
            <label htmlFor="select-category">
              Select a category:
              <select
                id="select-category"
                value={category}
                onChange={(event) => {
                  setCategory(event.target.value);
                }}
              >
                <option value={Category.Backlog}>Backlog</option>
                <option value={Category.InProgress}>In Progress</option>
                <option value={Category.Done}>Done</option>
              </select>
            </label>
            <br />
            <label htmlFor="input-title">Title: </label>
            <input
              id="input-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
            <br />
            <input
              style={{ margin: 7 }}
              type="Submit"
              value="Submit"
              readOnly={true}
            />
          </form>
        </Modal>
      )}
    </div>
  );
}
