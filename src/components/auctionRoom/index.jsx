import React from "react";
import { useNavigate, generatePath } from "react-router-dom";
import { convertToBase64 } from "../../ultilities/convertBase64";
const AuctionRoom = ({ data }) => {
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
        }}
      >
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            backgroundColor: "#0A5C36",
            fontFamily: "Nunito",
            color: "white",
            cursor: "pointer",
          }}
          onClick={() => {
            navigator(
              generatePath("/room/:id", {
                id: data["_id"],
              }),
              {
                state: {
                  data,
                },
              }
            );
          }}
        >
          Join
        </div>
      </div>
    </>
  );
};

export default AuctionRoom;
