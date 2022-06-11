import * as React from "react";

import { APIS, Category } from "./Types";

export default function NewTaskModal(props: {
  createTask: APIS["createTaskType"];
}) {
  const [category, setCategory] = React.useState<Category>(Category.Backlog);

  const onSubmit = (event) => {
    props.createTask(category);
    event.preventDefault(); // prevents page from refreshing on submit
  };

  return (
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
      <input type="Submit" value="Create New Task" />
    </form>
  );
}
