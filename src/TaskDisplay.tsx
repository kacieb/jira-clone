import * as React from "react";
import { Category, APIS, BoxData } from "./Types";
import { Column } from "./Column";

export default function TaskDisplay(props: {
  data: Array<BoxData>;
  updateTaskCategory: APIS["updateTaskCategoryType"];
}) {
  const { updateTaskCategory, data } = props;

  const dragItem = React.useRef<number>();
  const dragOverColumn = React.useRef<Category>();

  const stateMap = {
    Backlog: Category.InProgress,
    "In Progress": Category.Done,
    Done: Category.Done
  };

  const itemClick = (id: number, event) => {
    updateTaskCategory(id, stateMap[data[id].category]);
  };

  const dragItemStart = (id: number, event) => {
    dragItem.current = id;
  };

  const dragOverCategory = (category: Category, event) => {
    dragOverColumn.current = category;

    if (dragItem.current != null) {
      if (data[dragItem.current].category !== category) {
        event.preventDefault(); // prevent default to allow "drop" event
      }
    } else {
      console.error("dragItem.current not set on dragOverCategory");
    }
  };

  const drop = () => {
    if (dragItem.current != null && dragOverColumn.current != null) {
      updateTaskCategory(dragItem.current, dragOverColumn.current);
    } else {
      console.error("dragItem or dragOverColumn not set on drop");
    }
  };

  const filterBy = (category: Category) => {
    return data.filter((item) => item.category === category);
  };

  const createColumn = (category: Category) => (
    <Column
      category={category}
      data={filterBy(category)}
      box={{
        onClick: itemClick,
        onDragStart: dragItemStart
      }}
      onDragOver={(event) => {
        dragOverCategory(category, event);
      }}
      onDrop={drop}
    />
  );

  return (
    <div className="flex-container">
      {createColumn(Category.Backlog)}
      {createColumn(Category.InProgress)}
      {createColumn(Category.Done)}
    </div>
  );
}
