import "./styles.css";

import * as React from "react";
import type { Category, BoxData } from "./Types";

type CallbackFunction = (id: number, event) => void;

type BoxEventListeners = {
  onClick: CallbackFunction;
  onDragStart: CallbackFunction;
};

type BoxInfo = {
  id: number;
};

function Box(props: BoxEventListeners & BoxInfo) {
  return (
    <div
      className="box"
      onClick={(event) => {
        props.onClick(props.id, event);
      }}
      onDragStart={(event) => {
        props.onDragStart(props.id, event);
      }}
      draggable="true"
    >
      {props.id}
    </div>
  );
}

export function Column(props: {
  category: Category;
  data: Array<BoxData>;
  onDragOver: (event) => void;
  onDrop: () => void;
  box: BoxEventListeners;
}) {
  const items = props.data.map((val) => (
    <Box
      key={val.id}
      id={val.id}
      onClick={props.box.onClick}
      onDragStart={props.box.onDragStart}
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
