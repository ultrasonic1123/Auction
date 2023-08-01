import React from "react";
import { useState } from "react";
import styles from "./chatList.module.css";
const ChatList = () => {
  const [messages, setMessages] = useState([
    "Welcome to Dken Auction!",
    "Ready for staring your own aution",
    "Or join interesting aution",
  ]);

  const MessageItem = (message) => (
    <li className={styles["chat-item"]}>{message}</li>
  );

  return (
    <div>
      <ul>{messages.map((item) => MessageItem(item))}</ul>
    </div>
  );
};

export default ChatList;
