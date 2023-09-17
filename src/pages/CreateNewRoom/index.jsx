import React, { useState } from "react";
import styles from "./createRoom.module.css";
import DashboardHeader from "../../components/header";
import { CATEGORIES } from "../../ultilities/categories";
import { useSelector } from "react-redux";
import Loader from "../../components/loader";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;
import { useLocation } from "react-router-dom";
import { convertToBase64 } from "../../ultilities/convertBase64";
const CreateNewRoom = () => {
  const [previewImage, setPreviewImage] = useState("");
  const [file, setFile] = useState("");
  const { state } = useLocation();
  const base64Image = convertToBase64(state?.data?.image?.data?.data);
  const isEdit = state?.isEdit;
  console.log("isEdit", isEdit);
  const user = useSelector((state) => state.login);
  const [roomData, setRoomData] = useState(
    state?.data ?? {
      owner: user.phoneNumber ?? "",
      roomName: "",
      productName: "",
      description: "",
      category: "furnitures",
      priceStep: 10000,
      amounts: 1,
      initialPrice: 0,
      lastingTime: "30m",
      location: "Ha Noi",
      status: "pending",
      startAt: null,
      history: [],
      victoryPhoneNumber: "",
      bannedUsers: "",
    }
  );
  const [isLoading, setIsLoading] = useState(false);
  console.log(user);
  const handleChangeRoomName = (e) => {
    let name = e.target.value;
    setRoomData(() => ({
      ...roomData,
      roomName: name,
    }));
  };

  const handleChangeproductName = (e) => {
    let productName = e.target.value;
    setRoomData(() => ({
      ...roomData,
      productName: productName,
    }));
  };

  const handleChangeDesc = (e) => {
    let description = e.target.value;
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
    let priceStep = e.target.value;
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
    let lastingTime = e.target.value;
    setRoomData(() => ({
      ...roomData,
      lastingTime: lastingTime,
    }));
  };

  const handleChangeLocation = (e) => {
    let location = e.target.value;
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

  const handleChangeStatus = (e) => {
    setRoomData(() => ({
      ...roomData,
      status: e.target.value,
    }));
  };

  const handleChangeBannedUsers = (e) => {
    setRoomData(() => ({
      ...roomData,
      bannedUsers: e.target.bannedUsers,
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

  const handleOnSubmitFormData = async (update = false) => {
    setIsLoading(true);
    let formData = new FormData();

    formData.append("image", file);
    formData.append("room", JSON.stringify(roomData));

    try {
      const result = await fetch(
        `${SERVER_URL}/user/${update ? "update-room" : "create-new-room"}`,
        {
          method: "POST",
          body: formData,
        }
      );
      const newRoom = await result.json();
      console.log("newRoom", newRoom);
      if (newRoom.status == "active" && !newRoom.startAt) {
        const updatedStartAt = await fetch(
          `${SERVER_URL}/user/update-start-at`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              _id: newRoom._id,
              startAt: Date.now(),
            }),
          }
        );
      }
      if (!update) {
        const updatedUser = await fetch(`${SERVER_URL}/user/update-own-room`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phoneNumber: user.phoneNumber,
            room: newRoom._id,
          }),
        });
        console.log({ updatedUser });
      }

      setIsLoading(false);
    } catch (e) {
      console.log("Something went wrong!", e);
      setIsLoading(false);
    }
  };

  const resetRoom = () => {
    setRoomData({
      owner: "",
      roomName: "",
      productName: "",
      description: "",
      category: "furnitures",
      priceStep: 10000,
      amounts: 1,
      initialPrice: 0,
      lastingTime: "30m",
      location: "Ha Noi",
      status: "pending",
      startAt: null,
      history: [],
      victoryPhoneNumber: "",
      bannedUsers: "",
    });
  };

  return (
    <>
      <DashboardHeader resetRoom={resetRoom} />
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
              defaultValue={CATEGORIES[0]}
            >
              {CATEGORIES.map((item) => (
                <option value={item}>{item}</option>
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
        <div
          style={{ display: "flex", width: "100%", justifyContent: "center" }}
        >
          <div className={styles["create-room-item"]}>
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              onChange={(e) => handleChangeStatus(e)}
              defaultValue="pending"
              value={roomData.status}
            >
              <option value="pending">Pending</option>
              <option value="active">Active</option>
              <option value="closed">Closed</option>
              <option value="reopen">Re-open</option>
            </select>
          </div>
          <div className={styles["create-room-item"]}>
            <label htmlFor="banned-user">Banned Users</label>
            <input
              id="banned-user"
              placeholder="User phone numbers..."
              name="bannedUser"
              onChange={(e) => handleChangeBannedUsers(e)}
              value={roomData.bannedUsers}
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
              placeholder="Product name..."
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
              style={
                previewImage || base64Image ? { backgroundImage: "none" } : null
              }
            >
              {previewImage ? (
                <img src={previewImage}></img>
              ) : base64Image ? (
                <img
                  src={`data:image/${state?.data?.image?.data?.imageType};base64,${base64Image}`}
                />
              ) : null}
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
        {!isLoading ? (
          <button
            className={styles["submit-btn"]}
            onClick={
              !isEdit
                ? () => handleOnSubmitFormData()
                : () => handleOnSubmitFormData(true)
            }
          >
            {!isEdit ? "Create Auction Room" : "Update room"}
          </button>
        ) : (
          <button className={styles["submit-btn"]}>
            <Loader />
          </button>
        )}
      </div>
    </>
  );
};

export default CreateNewRoom;
