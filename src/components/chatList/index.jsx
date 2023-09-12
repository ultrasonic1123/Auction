import React, { useEffect } from "react";
import { useState } from "react";
import styles from "./chatList.module.css";
import { socket } from "../../socket";
const ChatList = () => {
  const [messages, setMessages] = useState([
    "Welcome to Dken Auction!",
    "Ready for staring your own aution",
    "Or join interesting aution",
  ]);

  useEffect(() => {
    socket.on("chat message", onChatListener);

    return () => socket.off("chat message", onChatListener);
  }, []);

  const onChatListener = (message) => {
    setMessages((prev) => [...prev, message.message]);
  };

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
