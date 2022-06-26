import * as React from "react";

import { APIS } from "./Types";

type ClosedTrashCanProps = { size: number; color: string };

function ClosedTrashCan(props: ClosedTrashCanProps) {
  const { size, color } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill={color}
      viewBox="0 0 16 16"
    >
      {" "}
      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />{" "}
      <path
        fill-rule="evenodd"
        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
      />{" "}
    </svg>
  );
}

export default function Trash(props: {
  activeTask: number | null;
  deleteTask: APIS["deleteTaskType"];
}) {
  const { activeTask, deleteTask } = props;
  const [color, setColor] = React.useState("black");
  const onDragOver = (event) => {
    event.preventDefault(); // prevent default to allow "drop" event
    setColor("red");
  };

  const onDragLeave = (event) => {
    setColor("black");
  };

  const onDrop = (event) => {
    if (activeTask != null) {
      deleteTask(activeTask);
    } else {
      console.error("Tried to delete task, but none was active.");
    }
    setColor("black");
  };
  return (
    <div onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
      <ClosedTrashCan size={50} color={color} />
    </div>
  );
}
