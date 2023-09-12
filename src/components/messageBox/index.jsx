import React, { useState } from "react";
import styles from "./messageBox.module.css";
import { socket } from "../../socket";
const MessageBox = () => {
  const [message, setMessage] = useState("");
  const handleMessageInput = (e) => {
    let message = e.target.value;
    setMessage(message);
  };

  const handleChat = () => {
    socket.emit("chat message", { message: message });
  };

  return (
    <div className={styles["message-box"]}>
      <input
        placeholder="Enter your comment..."
        className={styles["message-box-input"]}
        type="text"
        value={message}
        onChange={(e) => handleMessageInput(e)}
      ></input>
      <div className={styles["message-box-submit"]} onClick={handleChat}>
        <i className="fa fa-paper-plane" aria-hidden="true"></i>
      </div>
    </div>
  );
};

export default MessageBox;
