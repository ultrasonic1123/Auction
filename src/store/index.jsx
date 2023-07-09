import { Provider } from "react-redux";
import { store } from "../redux/configureStore";
const StoreProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
