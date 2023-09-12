import React, { useEffect, useState } from "react";
import DashboardHeader from "../../components/header";
import { useSelector } from "react-redux";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;
import AuctionRoom from "../../components/auctionRoom";
const History = () => {
  const [victoryRooms, setVictoryRooms] = useState([]);
  const [myRooms, setMyRooms] = useState([]);
  const [isLoadingMyRooms, setIsLoadingMyRooms] = useState(false);
  const [isLoadingMyVictoryRooms, setIsLoadingMyVictoryRooms] = useState(false);
  const user = useSelector((state) => state.login);

  const getOwnRooms = async () => {
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
    setMyRooms(rooms);
  };

  const getViectoryRooms = async (userId) => {};

  const renderMyRooms = () => {
    return (
      <div style={{ display: "flex" }}>
        {myRooms.map((item) => (
          <AuctionRoom isEdit={true} data={item} />
        ))}
      </div>
    );
  };

  const renderVictoryRooms = () => {
    return <div>Victory Rooms</div>;
  };

  useEffect(() => {
    getOwnRooms();
  }, []);
  return (
    <>
      <DashboardHeader />
      <div>
        <div>
          <h2>My own rooms</h2>
          {renderMyRooms()}
        </div>
        <div>
          <h2>Place of victory</h2>
          {renderVictoryRooms()}
        </div>
      </div>
    </>
  );
};

export default History;
