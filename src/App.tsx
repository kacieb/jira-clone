import "./styles.css";

import * as React from "react";
import TaskDisplay from "./TaskDisplay";
import NewTaskModal from "./NewTaskModal";
import { Category, BoxData, APIS } from "./Types";

/**
 * Data APIs at the moment
 */

export default function App() {
  const [exampleData, setExampleData] = React.useState<Array<BoxData>>(() => [
    { category: Category.Backlog, id: 0 },
    { category: Category.InProgress, id: 1 },
    { category: Category.InProgress, id: 2 },
    { category: Category.Done, id: 3 },
    { category: Category.Done, id: 4 },
    { category: Category.Done, id: 5 },
    { category: Category.Backlog, id: 6 }
  ]);

  const lastID = React.useRef<number>(6);

  let myString: String = "Kacie";

  // private
  const replaceField = (id: number, newField: BoxData) => {
    const newData = exampleData.map((u) => (u.id !== id ? u : newField));
    setExampleData(newData);
  };

  // TODO eventually make these APIs use a database. For now, just manage
  // data as React State and pass down to components as needed.
  const createTask: APIS["createTaskType"] = (category: Category) => {
    const newTask = { category, id: lastID.current + 1 };
    const newData = exampleData.concat(newTask);

    // increment lastID for the next task
    lastID.current += 1;
    setExampleData(newData);
  };

  const deleteTask = () => {
    /* TODO */
  };

  const updateTaskCategory: APIS["updateTaskCategoryType"] = (
    id: number,
    newCategory: Category
  ) => {
    const editedUser = {
      category: newCategory,
      id: id
    };
    replaceField(id, editedUser);
  };

  return (
    <div className="App">
      <h1>Hello {myString}</h1>
      <h2>Start editing to see some magic happen!</h2>
      <NewTaskModal createTask={createTask} />
      <TaskDisplay data={exampleData} updateTaskCategory={updateTaskCategory} />
    </div>
  );
}
