import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AuctionRoom from "../../components/auctionRoom";
import DashboardHeader from "../../components/header";
import Loader from "../../components/loader";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const CategoryDetail = () => {
  const [auctionRooms, setAuctionRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const type = useLocation().state.categoryType;
  console.log({ type });
  const getRoomsByCategory = async () => {
    setIsLoading(true);
    const response = await fetch(
      `${SERVER_URL}/user/get-rooms-by-category?category=${type.toLowerCase()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setAuctionRooms(data);
    setIsLoading(false);
  };

  useEffect(() => {
    getRoomsByCategory();
  }, []);

  const noResults = <span>There is no rooms in this category.</span>;

  return !isLoading ? (
    <>
      <DashboardHeader />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "2rem",
          marginTop: "50px",
          marginBottom: "20px",
        }}
      >
        {type}
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: "100%",
          justifyContent: "center",
          paddingBottom: "50px",
          rowGap: "20px",
        }}
      >
        {auctionRooms.length
          ? auctionRooms.map((item) => <AuctionRoom data={item} />)
          : noResults}
      </div>
    </>
  ) : (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Loader />
    </div>
  );
};

export default CategoryDetail;
