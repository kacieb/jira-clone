import "./styles.css";

import * as React from "react";
import type { Category } from "./App";

type FunctionReturner = (id: number) => (event) => void;
export type BoxData = { category: Category; id: number };

type BoxEventListeners = {
  onClick: FunctionReturner;
  onDragStart: FunctionReturner;
  onDragOver: FunctionReturner;
};

type BoxInfo = {
  id: number;
};

function Box(props: BoxEventListeners & BoxInfo) {
  return (
    <div
      className="box"
      onClick={props.onClick(props.id)}
      onDragStart={props.onDragStart(props.id)}
      onDragOver={props.onDragOver(props.id)}
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
      onDragOver={props.box.onDragOver}
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
