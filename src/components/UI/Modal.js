import React from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

export const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose}></div>;
};

export const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};
const portalLocation = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <React.Fragment>
      {/* this is the non-portal way of creating a modal ModalOverlay */}
      {/* <Backdrop/>
    <ModalOverlay>{props.children}</ModalOverlay> */}
      {/* And this is a portal way of creating a ModalOverlay */}
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalLocation
      )}
      ;
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalLocation
      )}
      ;
    </React.Fragment>
  );
};

export default Modal;
