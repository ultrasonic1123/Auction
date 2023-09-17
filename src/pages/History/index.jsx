import React, { useEffect, useState } from "react";
import DashboardHeader from "../../components/header";
import { useSelector } from "react-redux";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;
import AuctionRoom from "../../components/auctionRoom";
import Loader from "../../components/loader";
const History = () => {
  const [myRooms, setMyRooms] = useState([]);
  const [myVictoryRooms, setmyVictoryRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.login);

  const getOwnRooms = async () => {
    setLoading(true);
    let res = await fetch(
      `${SERVER_URL}/user/get-user-by-phone?phoneNumber=${user.phoneNumber}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let data = await res.json();
    let roomsRes = await fetch(`${SERVER_URL}/user/get-own-rooms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ids: data.rooms }),
    });
    let rooms = await roomsRes.json();
    let vitoryRooms = await fetch(`${SERVER_URL}/user/get-own-rooms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ids: data.victoryRooms }),
    });
    let vitoryRoomsJson = await vitoryRooms.json();
    setMyRooms(rooms);
    setmyVictoryRooms(vitoryRoomsJson);
    setLoading(false);
  };

  const renderMyRooms = () => {
    return (
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {loading ? (
          <Loader />
        ) : (
          myRooms.map((item) => (
            <AuctionRoom
              isEdit={true}
              data={item}
              allowView={true}
              key={item._id}
            />
          ))
        )}
      </div>
    );
  };

  const renderVictoryRooms = () => {
    return (
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {loading ? (
          <Loader />
        ) : (
          myVictoryRooms.map((item) => (
            <AuctionRoom
              key={item._id}
              isEdit={false}
              allowView={true}
              isVictoryRoom={true}
              data={item}
            />
          ))
        )}
      </div>
    );
  };

  useEffect(() => {
    getOwnRooms();
  }, []);
  return (
    <>
      <DashboardHeader />
      <div>
        <div>
          <h2
            style={{
              marginTop: "20px",
              marginLeft: "20px",
              marginBottom: "10px",
              textAlign: "center",
            }}
          >
            My own rooms
          </h2>
          {renderMyRooms()}
        </div>
        <div>
          <h2
            style={{
              marginTop: "20px",
              marginLeft: "20px",
              marginBottom: "10px",
              textAlign: "center",
            }}
          >
            Place of victory
          </h2>
          {renderVictoryRooms()}
        </div>
      </div>
    </>
  );
};

export default History;
