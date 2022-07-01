import "./styles.css";

import * as React from "react";
import TaskDisplay from "./TaskDisplay";
import TaskModal from "./TaskModal";
import CreateNewTaskButton from "./CreateNewTaskButton";
import Trash from "./Trash";
import { Category, BoxData, APIS } from "./Types";

const initialData = [
  { category: Category.Backlog, id: 0, title: "Add database for tasks" },
  { category: Category.InProgress, id: 1, title: "Add more fields to tasks" },
  { category: Category.Done, id: 2, title: "Add a way to delete tasks" },
  {
    category: Category.InProgress,
    id: 3,
    title: "Handle long titles gracefully."
  },
  { category: Category.Backlog, id: 4, title: "Make TaskModal prettier" }
];

export default function App() {
  const [exampleData, setExampleData] = React.useState<Array<BoxData>>(
    () => initialData
  );

  const lastID = React.useRef<number>(6);

  let myString: String = "Kacie";

  const [activeTask, setActiveTask] = React.useState<number | null>(null);

  // private
  const replaceField = (id: number, newField: BoxData) => {
    const newData = exampleData.map((u) => (u.id !== id ? u : newField));
    setExampleData(newData);
  };

  // private
  const reset = () => {
    setExampleData(initialData);
  };

  // TODO eventually make these APIs use a database. For now, just manage
  // data as React State and pass down to components as needed.
  const createTask: APIS["createTaskType"] = (
    category: Category,
    title: string
  ) => {
    const newTask = { category, title, id: lastID.current + 1 };
    const newData = exampleData.concat(newTask);

    // increment lastID for the next task
    lastID.current += 1;
    setExampleData(newData);
  };

  const getTask: APIS["getTaskType"] = (id: number) => {
    for (let i = 0; i < exampleData.length; i++) {
      if (exampleData[i].id === id) {
        return exampleData[i];
      }
    }

    console.error("Tried to access task " + id + " which does not exist");
    return null;
  };

  const deleteTask: APIS["deleteTaskType"] = (id: number) => {
    const newData = exampleData.filter((item) => item.id !== id);
    setExampleData(newData);
  };

  const updateTaskCategory: APIS["updateTaskCategoryType"] = (
    id: number,
    newCategory: Category
  ) => {
    const taskFromID = getTask(id);
    if (taskFromID != null) {
      const updatedTask = { ...taskFromID, category: newCategory };
      replaceField(id, updatedTask);
    }
  };

  const updateTask: APIS["updateTaskType"] = (
    id: number,
    newCategory: Category,
    newTitle: string
  ) => {
    const taskFromID = getTask(id);
    if (taskFromID != null) {
      const updatedTask = {
        ...taskFromID,
        category: newCategory,
        title: newTitle
      };
      replaceField(id, updatedTask);
    }
  };

  return (
    <div className="App">
      <h1>Hello {myString}</h1>
      <h2>Start editing to see some magic happen!</h2>
      <div className="flex-container-space-evenly">
        <CreateNewTaskButton createTask={createTask} />
        <button
          onClick={() => {
            reset();
          }}
        >
          Reset
        </button>
        <Trash deleteTask={deleteTask} activeTask={activeTask} />
      </div>
      <TaskDisplay
        data={exampleData}
        updateTaskCategory={updateTaskCategory}
        updateTask={updateTask}
        setActiveTask={setActiveTask}
        getTask={getTask}
      />
    </div>
  );
}
