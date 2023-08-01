import StoreProvider from "./store";
import RouterProvider from "./router";
function App() {
  return (
    <StoreProvider>
      <RouterProvider />
    </StoreProvider>
  );
}

export default App;
