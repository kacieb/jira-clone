import "./styles.css";

import * as React from "react";
import { Column, BoxData } from "./Column";

export enum Category {
  Backlog = "Backlog",
  InProgress = "In Progress",
  Done = "Done"
}

function Button(props: { title: string; onClick: () => void }) {
  return <button onClick={props.onClick}>{props.title}</button>;
}

export default function App() {
  return <Main />;
}

function Main() {
  let myString: String = "Kacie";

  const dragItem = React.useRef<number>();
  const dragOverItem = React.useRef<number>();
  const dragOverColumn = React.useRef<Category>();

  const [exampleData, setExampleData] = React.useState<Array<BoxData>>(() => [
    { category: Category.Backlog, id: 0 },
    { category: Category.InProgress, id: 1 },
    { category: Category.InProgress, id: 2 },
    { category: Category.Done, id: 3 },
    { category: Category.Done, id: 4 },
    { category: Category.Done, id: 5 },
    { category: Category.Backlog, id: 6 }
  ]);

  const stateMap = {
    Backlog: Category.InProgress,
    "In Progress": Category.Done,
    Done: Category.Done
  };

  const setNewField = (id: number, newField: BoxData) => {
    const newData = exampleData.map((u) => (u.id !== id ? u : newField));
    setExampleData(newData);
  };

  // this is called by Box later with onClick={onClick(id)} to ensure
  // the correct item is updated
  const onClick = (id: number) => {
    return (event) => {
      const editedUser = {
        category: stateMap[exampleData[id].category],
        id: id
      };
      setNewField(id, editedUser);
    };
  };

  const dragStart = (id: number) => {
    return (event) => {
      dragItem.current = id;
    };
  };

  const dragOver = (id: number) => {
    return (event) => {
      //dragOverItem.current = id;
    };
  };

  const dragOverCategory = (category: Category) => {
    return (event) => {
      dragOverColumn.current = category;

      // prevent default to allow "drop" event
      if (exampleData[dragItem.current].category !== category) {
        event.preventDefault();
      }
    };
  };

  const drop = () => {
    const editedUser = {
      category:
        dragOverColumn.current ?? exampleData[dragItem.current].category,
      id: dragItem.current
    };
    setNewField(dragItem.current, editedUser);
  };

  const filterBy = (category: Category) => {
    return exampleData.filter((item) => item.category === category);
  };

  const createNewItem = () => {};

  const createColumn = (category: Category) => (
    <Column
      category={category}
      data={filterBy(category)}
      box={{
        onClick: onClick,
        onDragStart: dragStart,
        onDragOver: dragOver
      }}
      onDragOver={dragOverCategory(category)}
      onDrop={drop}
    />
  );

  return (
    <div className="App">
      <h1>Hello {myString}</h1>
      <h2>Start editing to see some magic happen!</h2>
      <Button title="Create New Item" />
      <div className="flex-container">
        {createColumn(Category.Backlog)}
        {createColumn(Category.InProgress)}
        {createColumn(Category.Done)}
      </div>
    </div>
  );
}
