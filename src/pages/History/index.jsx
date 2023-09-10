import React, { useState } from "react";
import DashboardHeader from "../../components/header";
import { useSelector } from "react-redux";
const History = () => {
  const [victoryRooms, setVictoryRooms] = useState([]);
  const [myRooms, setMyRooms] = useState([]);
  const [isLoadingMyRooms, setIsLoadingMyRooms] = useState(false);
  const [isLoadingMyVictoryRooms, setIsLoadingMyVictoryRooms] = useState(false);
  const user = useSelector((state) => state.login);
  const getOwnRooms = async (userId) => {};
  const getViectoryRooms = async (userId) => {};
  const renderMyRooms = () => {
    return <div>ListRooms</div>;
  };

  const renderVictoryRooms = () => {
    return <div>Victory Rooms</div>;
  };
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
