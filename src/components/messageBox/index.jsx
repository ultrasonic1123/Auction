import React, { useState } from "react";
import styles from "./messageBox.module.css";
import { socket } from "../../socket";
import { useSelector } from "react-redux";
import Toast from "../toast";
const MessageBox = () => {
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleMessageInput = (e) => {
    let message = e.target.value;
    setMessage(message);
  };
  const user = useSelector((state) => state.login);
  const handleChat = () => {
    socket.emit("chat message", {
      message: message,
      user: { name: user.firstName },
    });
  };

  return (
    <>
      <Toast message={errorMessage} />
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
