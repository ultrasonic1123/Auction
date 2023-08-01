import React from "react";
import styles from "./messageBox.module.css";
const MessageBox = () => {
  return (
    <div className={styles["message-box"]}>
      <input
        placeholder="Enter your comment..."
        className={styles["message-box-input"]}
        type="text"
      ></input>
      <div className={styles["message-box-submit"]}>
        <i className="fa fa-paper-plane" aria-hidden="true"></i>
      </div>
    </div>
  );
};

export default MessageBox;
