import StoreProvider from "./store";
import RouterProvider from "./router";
import { useEffect } from "react";
import { socket } from "./socket";

function App() {
  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id);
    });
    socket.on("hello", (arg) => {
      console.log("message", arg);
    });
  }, []);
  return (
    <StoreProvider>
      <RouterProvider />
    </StoreProvider>
  );
}

export default App;
