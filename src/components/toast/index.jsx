import React from "react";

const Toast = ({ message }) => {
  return message ? (
    <div
      style={{
        zIndex: 999,
        borderRadius: "10px",
        position: "fixed",
        bottom: "10px",
        left: "50%",
        transform: "translateX(-25%)",
        backgroundColor: "red",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Nunito",
        padding: "5px",
      }}
    >
      <i
        className="fa fa-exclamation-circle"
        aria-hidden="true"
        style={{ color: "white" }}
      ></i>
      <span
        style={{
          paddingLeft: "5px",
          color: "white",
          fontWeight: "600",
          fontSize: "1rem",
        }}
      >
        {message}
      </span>
    </div>
  ) : null;
};

export default Toast;
