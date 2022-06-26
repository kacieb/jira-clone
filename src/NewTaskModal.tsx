import * as React from "react";

import { APIS, Category } from "./Types";

export default function NewTaskModal(props: {
  createTask: APIS["createTaskType"];
}) {
  const [category, setCategory] = React.useState<Category>(Category.Backlog);
  const [showModal, setShowModal] = React.useState<Boolean>(false);

  const onSubmit = (event) => {
    props.createTask(category);
    event.preventDefault(); // prevents page from refreshing on submit
    setShowModal(false);
  };

  const onClose = (event) => {
    setShowModal(false);

    // reset the form
    setCategory(Category.Backlog);
  };

  return (
    <>
      <button
        onClick={(e) => {
          setShowModal(true);
        }}
      >
        Create New Task
      </button>
      {showModal && (
        <>
          <div className="full-screen" />
          <div className="modal">
            <div className="modal-content" role="dialog">
              <form onSubmit={onSubmit}>
                <label>
                  Select a category:
                  <select
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
                <input style={{ margin: 7 }} type="Submit" value="Submit" />
              </form>
              <button style={{ margin: 7, float: "right" }} onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
