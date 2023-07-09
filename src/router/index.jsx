import { BrowserRouter, Route, Routes } from "react-router-dom";

function RouterProvider() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<></>} />
      </Routes>
    </BrowserRouter>
  );
}
