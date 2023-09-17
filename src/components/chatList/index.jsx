import React, { useEffect } from "react";
import { useState } from "react";
import styles from "./chatList.module.css";
import { socket } from "../../socket";
import { useSelector } from "react-redux";
const ChatList = () => {
  const user = useSelector((state) => state.login);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("chat message", onChatListener);

    return () => socket.off("chat message", onChatListener);
  }, []);

  const onChatListener = (data) => {
    console.log(data);
    setMessages([...data]);
  };

  const MessageItem = (message) => (
    <div
      className={styles["chat-item"]}
      style={
        message.user.name == user.firstName
          ? { alignSelf: "flex-end" }
          : { alignSelf: "flex-start" }
      }
    >
      <span className={styles["chat-user"]}>{message.user.name}</span>
      <span
        style={
          message.user.name == user.firstName
            ? { backgroundColor: "rgba(245, 245, 245, 0.75)" }
            : null
        }
        className={styles["chat-message"]}
      >
        {message.message}
      </span>
    </div>
  );

  return (
    <div className={styles["list-chat"]}>
      {messages.map((item) => MessageItem(item))}
    </div>
  );
};

export default ChatList;
