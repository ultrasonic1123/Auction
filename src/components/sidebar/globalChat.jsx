import React from "react";
import styles from "./globalChat.module.css";
import ChatList from "../chatList";
import MessageBox from "../messageBox";
const GlobalChat = () => {
  return (
    <div className={styles["global-chat-container"]}>
      <h3>Global Chat</h3>
      <ChatList />
      <MessageBox />
    </div>
  );
};

export default GlobalChat;
