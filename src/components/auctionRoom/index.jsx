import React from "react";
import { useNavigate, generatePath } from "react-router-dom";
import { convertToBase64 } from "../../ultilities/convertBase64";
import styles from "./auctionRoom.module.css";
const AuctionRoom = ({ data, isEdit, allowView, isVictoryRoom }) => {
  const navigator = useNavigate();
  const base64Image = convertToBase64(data.image.data.data);
  console.log({ base64Image });
  return (
    <>
      <div
        style={{
          marginLeft: "20px",
          width: "22%",
          borderRadius: "10px",
          boxShadow: "0px 0px 8px grey",
          marginBottom: "20px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          className={styles["badge"]}
          style={
            data.status === "active"
              ? { backgroundColor: "green" }
              : data.status === "closed"
              ? { backgroundColor: "red" }
              : { backgroundColor: "yellow" }
          }
        >
          {data.status.slice(0, 1).toUpperCase() + data.status.slice(1)}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            fontFamily: "Nunito",
          }}
        >
          {data.roomName}
        </div>
        <div
          style={{
            width: "100%",
            height: "200px",
            backgroundPosition: "center",
            backgroundImage: `url(data:image/${data.image.imageType};base64,${base64Image})`,
            fontFamily: "Nunito",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
          }}
        ></div>
        {allowView && (
          <div
            className={styles["btn"]}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              backgroundColor: "#0A5C36",
              fontFamily: "Nunito",
              color: "white",
              cursor: "pointer",
              borderBottom: "1px solid white",
              opacity: 0.9,
            }}
            onClick={() => {
              navigator(
                generatePath("/room/:id", {
                  id: data["_id"],
                }),
                {
                  state: {
                    data,
                    isView: allowView,
                  },
                }
              );
            }}
          >
            View
          </div>
        )}
        {!isVictoryRoom && (
          <div
            className={styles["btn"]}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              backgroundColor: "#0A5C36",
              fontFamily: "Nunito",
              color: "white",
              cursor: "pointer",
              opacity: 0.9,
            }}
            onClick={() => {
              navigator(
                !isEdit
                  ? generatePath("/room/:id", {
                      id: data["_id"],
                    })
                  : "/create-new-auction",
                {
                  state:
                    data.status == "active"
                      ? {
                          data,
                          isEdit,
                        }
                      : {
                          data,
                          isView: true,
                          isEdit,
                        },
                }
              );
            }}
          >
            {!isEdit ? (data.status == "active" ? "Join" : "View") : "Update"}
          </div>
        )}
      </div>
    </>
  );
};

export default AuctionRoom;
