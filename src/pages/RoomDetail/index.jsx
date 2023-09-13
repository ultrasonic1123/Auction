import React, { useEffect, useState } from "react";
import { UserCost } from "../../components/userCost";
import { socket } from "../../socket";
import { useLocation, useParams } from "react-router-dom";
import DashboardHeader from "../../components/header";
import { convertToBase64 } from "../../ultilities/convertBase64";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { convertRemainTime } from "../../ultilities/convertRemainTime";
import VictoryModal from "../../components/victoryModal";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const RoomDetail = () => {
  const user = useSelector((state) => state.login);
  const roomId = useParams();
  const { state } = useLocation();

  const [price, setPrice] = useState(null);
  const [bidHistory, setBidHistory] = useState(
    !state?.isView
      ? [
          { user: "", price: 0, phoneNumber: "" },
          { user: "", price: 0, phoneNumber: "" },
          { user: "", price: 0, phoneNumber: "" },
          { user: "", price: 0, phoneNumber: "" },
        ]
      : state?.data?.history
  );
  const [remainTime, setRemainTime] = useState("");
  const [disbleInput, setDisableInput] = useState(false);
  const [displayModal, setDisplayModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const error = errorMessage && (
    <div
      style={{
        position: "fixed",
        bottom: "80px",
        width: "25%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Nunito",
      }}
    >
      <i
        className="fa fa-exclamation-circle"
        aria-hidden="true"
        style={{ color: "red" }}
      ></i>
      <span style={{ color: "red", fontWeight: "600" }}> {errorMessage}</span>
    </div>
  );

  useEffect(() => {
    socket.emit("join", { room: roomId.id, value: "" });
    socket.on("bid", onBidListener);
    socket.emit("bid", {
      room: roomId.id,
      value: 0,
      user: user?.firstName ?? "",
      phone: user?.phoneNumber ?? "",
    });
    return () => socket.off("bid", onBidListener);
  }, []);

  useEffect(() => {
    let timeId = setInterval(() => {
      setRemainTime(
        convertRemainTime(state.data.startAt, state.data.lastingTime)
      );
    }, 1000);
    let timeToEnd =
      calculateLastingTime(state.data.lastingTime) -
      Math.floor((Date.now() - state.data.startAt) / 1000);
    if (timeToEnd < 0) timeToEnd = 0;
    let timeOutId = setTimeout(() => {
      if (user?.phoneNumber == state.data.owner) {
        fetch(`${SERVER_URL}/user/update-room-status`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: state.data._id,
            status: "closed",
          }),
        })
          .then(() => {
            console.log("END - ROOM");
          })
          .catch((e) => console.log("ERR", e));
      }

      setDisableInput(true);
      setDisplayModal(true);
      console.log("CHECK", bidHistory);
      if (user?.phoneNumber == state.data.owner) {
        fetch(`${SERVER_URL}/user/update-room-history`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: state.data._id,
            history: bidHistory,
          }),
        });
      }
      if (user?.phoneNumber === bidHistory[0].phoneNumber) {
        fetch(`${SERVER_URL}/user/update-victory-rooms`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            room: state.data._id,
            phoneNumber: user.phoneNumber,
          }),
        });
      }
    }, timeToEnd * 1000);
    return () => {
      clearInterval(timeId);
      clearTimeout(timeOutId);
    };
  }, [bidHistory]);

  const calculateLastingTime = (lastingTime) => {
    if (lastingTime.includes("h")) {
      return +lastingTime.split("h")[0] * 60 * 60;
    } else if (lastingTime.includes("m")) {
      return +lastingTime.split("m")[0] * 60;
    } else if (lastingTime.includes("s")) {
      return +lastingTime.split("s")[0];
    }
  };

  const handleOnBid = () => {
    console.log("user22", user);
    if (price < bidHistory[0].price + +state.data.priceStep) {
      setErrorMessage(
        "Your price must be bigger than the total of highest price and price step"
      );
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    } else {
      socket.emit("bid", {
        room: roomId.id,
        value: price,
        user: user.firstName + " " + user.lastName,
        phone: user.phoneNumber,
      });
    }
  };

  const onBidListener = (message) => {
    if (state.data._id == message.id) {
      setBidHistory(message.bidHistory);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <VictoryModal
        isOpen={displayModal}
        user={bidHistory[0]}
        setIsOpen={setDisplayModal}
      />
      <DashboardHeader />
      <div
        style={{
          width: "80%",
          transform: "translateX(10%)",
          boxShadow: "0px 0px 8px grey",
          fontFamily: "Nunito",
        }}
      >
        <div style={{ display: "flex" }}>
          <div
            style={
              !state?.isView
                ? { width: "30%", height: "400px" }
                : { width: "30%", height: "400px", overflowY: "scroll" }
            }
          >
            <h1 style={{ textAlign: "center" }}>
              {!state?.isView ? "Charts" : "Bid History"}
            </h1>
            <hr />
            {!state?.isView
              ? bidHistory.slice(0, 4).map((item, index) => {
                  let isHighest = index === 0;
                  return (
                    <UserCost
                      isHighest={isHighest}
                      userName={item.user ?? "anonymous"}
                      price={item.price}
                    />
                  );
                })
              : state.data?.history?.length
              ? state.data.history.map((item, index) => {
                  let isHighest = index === 0;
                  return (
                    <UserCost
                      isHighest={isHighest}
                      userName={item.user ?? "anonymous"}
                      price={item.price}
                    />
                  );
                })
              : bidHistory.map((item, index) => {
                  let isHighest = index === 0;
                  return (
                    <UserCost
                      isHighest={isHighest}
                      userName={item.user ?? "anonymous"}
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
                borderLeft: "1px solid grey",
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
          <div
            style={{
              width: "30%",
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
            }}
          >
            <div style={{ width: "100%" }}>
              <h3 style={{ marginBottom: "15px" }}>Auction Room Information</h3>
              <h4 style={{ marginBottom: "15px" }}>
                Aution Owner: {state.data.owner}
              </h4>
              <ul
                style={{
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <li>
                  <strong>Price step:</strong> {state.data.priceStep} VND
                </li>
                <li>
                  <strong>Lasting time:</strong> {state.data.lastingTime}
                </li>
                <li>
                  <strong>Remain time:</strong> {remainTime}
                </li>
              </ul>
            </div>
            {!state?.isView ? (
              <div style={{ width: "100%" }}>
                {error}
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
                  onClick={
                    user.phoneNumber
                      ? handleOnBid
                      : () => {
                          setErrorMessage(
                            "You must login to use this function"
                          );
                          setTimeout(() => {
                            setErrorMessage("");
                          }, 5000);
                        }
                  }
                >
                  Bid
                </button>
              </div>
            ) : (
              <div style={{ width: "100%" }}>
                <h4>Winner's name:</h4>
                <span>{state?.data?.history[0]?.user ?? ""}</span>
                <h4>Winner's phone number:</h4>
                <span>{state?.data?.history[0]?.phoneNumber ?? ""}</span>
              </div>
            )}
          </div>
          <div
            style={{
              width: "70%",
              borderLeft: "1px solid grey",
              paddingLeft: "20px",
            }}
          >
            <h2 style={{ height: "40px", textAlign: "center" }}>Description</h2>
            <p style={{ fontSize: "1.25rem", textAlign: "center" }}>
              {state.data.description}
            </p>
            <h3>Initial price: </h3>
            <span>{state.data.initialPrice}</span>
            <h3>Product Name: </h3>
            <span>{state.data.productName}</span>
            <h3>Product Type: </h3>
            <span>{state.data.category}</span>
            <h3>Location: </h3>
            <span>{state.data.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetail;
