import React, { useEffect, useState } from "react";
import { UserCost } from "../../components/userCost";
import { socket } from "../../socket";
import { useLocation, useParams } from "react-router-dom";
import DashboardHeader from "../../components/header";
import { convertToBase64 } from "../../ultilities/convertBase64";
import styles from "./roomDetail.module.css";
import { useSelector } from "react-redux/es/hooks/useSelector";
const RoomDetail = () => {
  const roomId = useParams();
  const { state } = useLocation();
  const [price, setPrice] = useState(null);
  const [bidHistory, setBidHistory] = useState([
    { user: "", price: 0 },
    { user: "", price: 0 },
    { user: "", price: 0 },
    { user: "", price: 0 },
  ]);
  useEffect(() => {
    console.log(bidHistory);
  }, [bidHistory]);
  const user = useSelector((state) => state.login);
  console.log({ user });
  useEffect(() => {
    socket.emit("join", { room: roomId.id, value: "" });
    socket.on("bid", onBidListener);
    socket.emit("bid", { room: roomId.id, value: 0, user: user.firstName });
    return () => socket.off("bid", onBidListener);
  }, []);

  const handleOnBid = () => {
    socket.emit("bid", {
      room: roomId.id,
      value: price,
      user: user.firstName ?? "anonymous",
    });
  };
  const onBidListener = (message) => {
    console.log(message);
    setBidHistory(message.bidHistory);
  };

  return (
    <>
      <DashboardHeader />
      <div
        style={{
          width: "80%",
          transform: "translateX(10%)",
          boxShadow: "0px 0px 8px grey",
        }}
      >
        <div style={{ display: "flex" }}>
          <div style={{ width: "30%", height: "400px" }}>
            <h1 style={{ textAlign: "center" }}>Charts</h1>
            <hr />
            {bidHistory.map((item, index) => {
              let isHighest = index === 0;
              return (
                <UserCost
                  isHighest={isHighest}
                  userName={"anonymous"}
                  price={item.price}
                />
              );
            })}
          </div>
          <div style={{ width: "70%" }}>
            <h1 style={{ textAlign: "center" }}>{state.data.productName}</h1>
            <hr />
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              <img
                src={`data:image/${state.data.image.imageType};base64,
                ${convertToBase64(state.data.image.data.data)}`}
                style={{ objectFit: "cover", width: "600px", height: "400px" }}
              />
            </div>
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ width: "30%" }}>
            <div style={{ width: "100%" }}>
              <h3>Auction Room Information</h3>
              <h4>Aution Owner: {state.data.owner}</h4>
              <ul
                style={{
                  listStyle: "none",
                }}
              >
                <li>Price step: {state.data.priceStep} VND</li>
                <li>Lasting time: 30 minutes</li>
              </ul>
            </div>
            <input
              style={{
                width: "100%",
                height: "40px",
              }}
              placeholder="Enter your price..."
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></input>
            <button
              style={{ textAlign: "center", width: "100%", height: "40px" }}
              onClick={handleOnBid}
            >
              Bid
            </button>
          </div>
          <div style={{ width: "70%" }}>
            <h2 style={{ height: "40px", textAlign: "center" }}>Description</h2>
            <p style={{ fontSize: "1.25rem", textAlign: "center" }}>
              {state.data.description}
            </p>
            <h3>Product Name: {state.data.productName}</h3>
            <h3>Product Type: {state.data.category}</h3>
            <h3>Location: {state.data.location}</h3>
            <h3>Initial price: {state.data.initialPrice}</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomDetail;
