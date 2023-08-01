import React from "react";
import image from "../../assets/images/1.jpg";
const SliceShow = () => {
  return (
    <div
      style={{
        display: "flex",
        width: "70%",
        height: "20vh",
        position: "relative",
      }}
    >
      <i
        style={{
          position: "absolute",
          left: 0,
          top: "50%",
          transform: "translateY(-50%)",
        }}
        className="fa fa-chevron-left"
        aria-hidden="true"
      ></i>
      <img
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        src={image}
      ></img>
      <i
        style={{
          position: "absolute",
          right: 0,
          top: "50%",
          transform: "translateY(-50%)",
        }}
        className="fa fa-chevron-right"
        aria-hidden="true"
      ></i>
    </div>
  );
};

export default SliceShow;
