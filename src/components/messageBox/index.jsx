import React, { useState } from "react";
import styles from "./messageBox.module.css";
import { socket } from "../../socket";
import { useSelector } from "react-redux";
const MessageBox = () => {
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleMessageInput = (e) => {
    let message = e.target.value;
    setMessage(message);
  };
  const user = useSelector((state) => state.login);
  console.log("USER", user);
  const handleChat = () => {
    socket.emit("chat message", {
      message: message,
      user: { name: user.firstName },
    });
  };
  const error = errorMessage && (
    <div
      style={{
        position: "fixed",
        bottom: "55px",
        width: "25%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Nunito",
      }}
    >
      <i
        className="fa fa-exclamation-circle"
        aria-hidden="true"
        style={{ color: "red" }}
      ></i>
      <span style={{ color: "red", fontWeight: "600" }}> {errorMessage}</span>
    </div>
  );
  return (
    <>
      {error}
      <div className={styles["message-box"]}>
        <input
          placeholder="Enter your message..."
          className={styles["message-box-input"]}
          type="text"
          value={message}
          onChange={(e) => handleMessageInput(e)}
        ></input>
        <div
          className={styles["message-box-submit"]}
          onClick={
            user?.phoneNumber
              ? handleChat
              : () => {
                  setErrorMessage("You must login to use this function!");
                  setTimeout(() => {
                    setErrorMessage("");
                  }, 3000);
                }
          }
        >
          <i className="fa fa-paper-plane" aria-hidden="true"></i>
        </div>
      </div>
    </>
  );
};

export default MessageBox;
