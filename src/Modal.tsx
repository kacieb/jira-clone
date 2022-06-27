import * as React from "react";

export default function Modal(props: { children }) {
  return (
    <>
      <div className="full-screen" />
      <div className="modal-content" role="dialog">
        {props.children}
      </div>
    </>
  );
}
