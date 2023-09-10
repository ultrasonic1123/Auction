import React, { useState } from "react";
import styles from "./createRoom.module.css";
import DashboardHeader from "../../components/header";
import { CATEGORIES } from "../../ultilities/categories";
import { useSelector } from "react-redux";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const CreateNewRoom = () => {
  const [previewImage, setPreviewImage] = useState("");
  const [file, setFile] = useState("");
  const [roomData, setRoomData] = useState({
    owner: "",
    roomName: "",
    productName: "",
    description: "",
    category: "",
    priceStep: 10000,
    amounts: 1,
    initialPrice: 0,
    lastingTime: "30m",
    location: "Ha Noi",
  });
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.login);
  const handleChangeRoomName = (e) => {
    let name = e.target.value.trim();
    setRoomData(() => ({
      ...roomData,
      roomName: name,
    }));
  };

  const handleChangeproductName = (e) => {
    let productName = e.target.value.trim();
    setRoomData(() => ({
      ...roomData,
      productName: productName,
    }));
  };

  const handleChangeDesc = (e) => {
    let description = e.target.value.trim();
    setRoomData(() => ({
      ...roomData,
      description: description,
    }));
  };

  const handleChangeCategory = (e) => {
    let category = e.target.value;
    setRoomData(() => ({
      ...roomData,
      category: category,
    }));
  };

  const handleChangePriceStep = (e) => {
    let priceStep = e.target.value.trim();
    setRoomData(() => ({
      ...roomData,
      priceStep: priceStep,
    }));
  };

  const handleChangeAmounts = (e) => {
    let amounts = e.target.value;
    setRoomData(() => ({
      ...roomData,
      amounts: amounts,
    }));
  };

  const handleChangeLastingTime = (e) => {
    let lastingTime = e.target.value.trim();
    setRoomData(() => ({
      ...roomData,
      lastingTime: lastingTime,
    }));
  };

  const handleChangeLocation = (e) => {
    let location = e.target.value.trim();
    setRoomData(() => ({
      ...roomData,
      location: location,
    }));
  };

  const handleChangeInitialPrice = (e) => {
    let initialPrice = e.target.value;
    setRoomData(() => ({
      ...roomData,
      initialPrice: initialPrice,
    }));
  };

  const handleImageChange = (e) => {
    let file = e.target.files[0];
    setFile(file);
    let imageSrc;
    if (file) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onloadend = (e) => {
        imageSrc = e.target.result;
        setPreviewImage(imageSrc);
      };
    }
  };

  const handleOnSubmitFormData = async () => {
    setIsLoading(true);
    let formData = new FormData();

    formData.append("image", file);
    formData.append("room", JSON.stringify(roomData));

    try {
      const newRoom = await fetch(`${SERVER_URL}/user/create-new-room`, {
        method: "POST",
        body: formData,
      });
      console.log("room", newRoom);

      const updatedUser = await fetch(`${SERVER_URL}/user/update-own-room`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber: user.phoneNumber,
          room: newRoom._Id,
        }),
      });

      console.log({ updatedUser });
    } catch (e) {
      console.log("Something went wrong!");
    }
  };

  return (
    <>
      <DashboardHeader />
      <div
        style={{
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2>Auction Room Descrtiption:</h2>
        <div
          style={{ display: "flex", width: "100%", justifyContent: "center" }}
        >
          <div className={styles["create-room-item"]}>
            <label htmlFor="room-name">Room name</label>
            <input
              id="room-name"
              placeholder="Room name..."
              name="roomName"
              onChange={(e) => handleChangeRoomName(e)}
              value={roomData.roomName}
            ></input>
          </div>
          <div className={styles["create-room-item"]}>
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              onChange={(e) => handleChangeCategory(e)}
              value={roomData.category}
            >
              {CATEGORIES.map((item) => (
                <option>{item}</option>
              ))}
            </select>
          </div>
        </div>
        <div
          style={{ display: "flex", width: "100%", justifyContent: "center" }}
        >
          <div className={styles["create-room-item"]}>
            <label htmlFor="lasting-time">Lasting time</label>
            <input
              id="lasting-time"
              placeholder="Lasting time..."
              name="lastingTime"
              onChange={(e) => handleChangeLastingTime(e)}
              value={roomData.lastingTime}
            ></input>
          </div>
          <div className={styles["create-room-item"]}>
            <label htmlFor="price-step">Price step</label>
            <input
              id="price-step"
              placeholder="Price step..."
              name="priceStep"
              onChange={(e) => handleChangePriceStep(e)}
              value={roomData.priceStep}
            ></input>
          </div>
        </div>
        <h2 style={{ marginTop: "20px" }}>Product Detail:</h2>
        <div
          style={{ display: "flex", width: "100%", justifyContent: "center" }}
        >
          <div className={styles["create-room-item"]}>
            <label htmlFor="product-name">Product name</label>
            <input
              id="product-name"
              placeholder="Room name..."
              name="productName"
              onChange={(e) => handleChangeproductName(e)}
              value={roomData.productName}
            ></input>
          </div>
          <div className={styles["create-room-item"]}>
            <label htmlFor="initial-price">Initial price</label>
            <input
              id="initial-price"
              placeholder="Initial price..."
              onChange={(e) => handleChangeInitialPrice(e)}
              value={roomData.initialPrice}
            ></input>
          </div>
        </div>
        <div
          style={{ display: "flex", width: "100%", justifyContent: "center" }}
        >
          <div className={styles["create-room-item"]}>
            <label htmlFor="amounts">Amount</label>
            <input
              id="amounts"
              placeholder="Amounts..."
              type="number"
              onChange={(e) => handleChangeAmounts(e)}
              value={roomData.amounts}
            ></input>
          </div>
          <div className={styles["create-room-item"]}>
            <label htmlFor="location">Location</label>
            <input
              id="location"
              placeholder="Location..."
              onChange={(e) => {
                handleChangeLocation(e);
              }}
              value={roomData.location}
            ></input>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <h3>Product description</h3>
          <textarea
            style={{
              width: "calc(60% + 10px)",
              marginRight: "10px",
              height: "100px",
            }}
            onChange={(e) => handleChangeDesc(e)}
          />
          <h3>Product image</h3>
          <div className={styles["container"]}>
            <label
              id="image-preview"
              htmlFor="image-input"
              className={styles["image-preview"]}
              style={previewImage ? { backgroundImage: "none" } : null}
            >
              {previewImage ? <img src={previewImage}></img> : null}
            </label>
            <input
              id="image-input"
              type="file"
              hidden
              onChange={(e) => handleImageChange(e)}
              accept="image/gif, image/png, image/jpeg"
            />
          </div>
        </div>
        <button
          className={styles["submit-btn"]}
          onClick={() => handleOnSubmitFormData()}
        >
          Create Auction Room
        </button>
      </div>
    </>
  );
};

export default CreateNewRoom;
