import Login from "./pages/login";
import StoreProvider from "./store";

function App() {
  return (
    <StoreProvider>
      <Login />
    </StoreProvider>
  );
}

export default App;
