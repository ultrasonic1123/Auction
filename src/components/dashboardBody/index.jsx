import React, { useEffect, useState } from "react";
import CategoriesList from "../categogies";
import styles from "./dashboardBody.module.css";
import AuctionRoom from "../auctionRoom";
import Loader from "../loader";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const DashboardBody = () => {
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getRooms = async () => {
    setIsLoading(true);
    let response = await fetch(`${SERVER_URL}/user/get-rooms`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let data = await response.json();
    setRooms(data);
    setIsLoading(false);
  };

  useEffect(() => {
    getRooms();
  }, []);
  return (
    <div style={{ width: "75%", marginLeft: "0px", fontFamily: "Nunito" }}>
      <div className={styles["upper-body"]}></div>
      <div style={{ background: "white" }}>
        <h2
          style={{
            height: "32px",
            margin: "0px 0px 0px 0px",
            fontFamily: "Nunito",
            paddingLeft: "5px",
            background: "rgb(245, 245, 245)",
          }}
        >
          Categories
        </h2>
        <CategoriesList />
      </div>
      <div style={{ background: "white" }}>
        <h2
          style={{
            margin: "0px 0px 10px 0px",
            fontFamily: "Nunito",
            paddingLeft: "5px",
            background: "rgb(245, 245, 245)",
          }}
        >
          Auction Room
        </h2>
        {isLoading ? (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <Loader />
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              width: "100%",
              justifyContent: "start",
            }}
          >
            {rooms.map((item) => {
              return <AuctionRoom data={item} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardBody;
