import "./styles.css";

import * as React from "react";
import type { Category, BoxData, APIS } from "./Types";
import TaskModal from "./TaskModal";

type CallbackFunction = (id: number, event) => void;

function EditButton(props: { onClick: (event) => void }) {
  const [color, setColor] = React.useState("black");
  return (
    <div
      role="button"
      className="edit-button"
      onClick={props.onClick}
      onPointerEnter={(event) => {
        setColor("green");
      }}
      onPointerLeave={(event) => {
        setColor("black");
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={color}
        width={30}
      >
        <g id="Layer_2" data-name="Layer 2">
          <g id="edit-2">
            <g id="edit-2-2" data-name="edit-2">
              <rect
                style={{ fill: "#fff", opacity: 0 }}
                width="24"
                height="24"
              />
              <path d="M19,20H5a1,1,0,0,0,0,2H19a1,1,0,0,0,0-2Z" />
              <path d="M5,18h.09l4.17-.38a2,2,0,0,0,1.21-.57l9-9a1.92,1.92,0,0,0-.07-2.71h0L16.66,2.6A2,2,0,0,0,14,2.53l-9,9a2,2,0,0,0-.57,1.21L4,16.91a1,1,0,0,0,.29.8A1,1,0,0,0,5,18ZM15.27,4,18,6.73,16,8.68,13.32,6Zm-8.9,8.91L12,7.32l2.7,2.7-5.6,5.6-3,.28Z" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}

type BoxEventListeners = {
  onClick: CallbackFunction;
  onDragStart: CallbackFunction;
};

type BoxAPIs = {
  updateTask: APIS["updateTaskType"];
};

type BoxInfo = {
  data: BoxData;
};

function Box(props: BoxEventListeners & BoxAPIs & BoxInfo) {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <>
      <div
        className="box"
        onClick={(event) => {
          props.onClick(props.data.id, event);
        }}
        onDragStart={(event) => {
          props.onDragStart(props.data.id, event);
        }}
        draggable="true"
      >
        {props.data.id}
        <br />
        {props.data.title}
        <br />
        <EditButton
          onClick={(event) => {
            event.stopPropagation(); // stop parent from being pressed
            setShowModal(true);
          }}
        />
      </div>
      {showModal && (
        <TaskModal
          type="Edit"
          onSubmit={() => {
            setShowModal(false);
          }}
          updateTask={props.updateTask}
          currentTaskID={props.data.id}
        />
      )}
    </>
  );
}

export function Column(props: {
  category: Category;
  data: Array<BoxData>;
  onDragOver: (event) => void;
  onDrop: () => void;
  box: BoxEventListeners & BoxAPIs;
}) {
  const items = props.data.map((val) => (
    <Box
      key={val.id}
      data={val}
      // TODO there is probably a nicer way to do this by spreading
      onClick={props.box.onClick}
      onDragStart={props.box.onDragStart}
      updateTask={props.box.updateTask}
    />
  ));

  return (
    <>
      <div
        className="column"
        onDragOver={props.onDragOver}
        onDrop={props.onDrop}
      >
        <header>
          <h2>{props.category}</h2>
        </header>
        <div className="item-container column">{items}</div>
      </div>
    </>
  );
}
