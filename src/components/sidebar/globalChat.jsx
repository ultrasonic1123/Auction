import React, { useEffect } from "react";
import styles from "./globalChat.module.css";
import ChatList from "../chatList";
import MessageBox from "../messageBox";
import { socket } from "../../socket";
const GlobalChat = () => {
  useEffect(() => {
    socket.emit("main page", {});
  }, []);
  return (
    <div className={styles["global-chat-container"]}>
      <h3>Global Chat</h3>
      <ChatList />
      <MessageBox />
    </div>
  );
};

export default GlobalChat;
