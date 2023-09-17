import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/dashboard";
import Login from "../pages/login";
import CategoryDetail from "../pages/Category";
import RoomDetail from "../pages/RoomDetail";
import CreateNewRoom from "../pages/CreateNewRoom";
import History from "../pages/History";
import SearchResult from "../pages/searchResult";
function RouterProvider() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/category" element={<CategoryDetail />} />
        <Route path="/room/:id" element={<RoomDetail />} />
        <Route path="/create-new-auction" element={<CreateNewRoom />} />
        <Route path="/auction-room-history" element={<History />} />
        <Route path="/search-result" element={<SearchResult />} />
      </Routes>
    </BrowserRouter>
  );
}
export default RouterProvider;
