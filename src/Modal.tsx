import * as React from "react";

export default function Modal(props: {
  children: React.ReactElement<any>;
  onClose;
}) {
  return (
    <>
      <div className="full-screen" />
      <div className="modal-content" role="dialog">
        {props.children}
        <button style={{ margin: 7, float: "right" }} onClick={props.onClose}>
          Close
        </button>
      </div>
    </>
  );
}
