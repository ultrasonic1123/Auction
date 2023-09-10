import React, { useCallback, useEffect, useState } from "react";
import styles from "../../assets/css/login/registerModal.module.css";
import smsAuthentication from "../../firebase";
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import Loader from "../loader";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;
export const RegisterModal = ({ onMoreActions }) => {
  const monthOptions = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dates = Array.from({ length: 31 }, (_, i) => i + 1);
  const years = Array.from({ length: 124 }, (_, i) => i + 1900);
  const [showModal, setShowModal] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState("");
  const [validOTP, setValidOTP] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [validPhoneNumber, setValidPhoneNumber] = useState(true);
  const [validFirstName, setValidFirstName] = useState(true);
  const [validLastName, setValidLastName] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    onMoreActions((pre) => ({ ...pre, showModal: setShowModal }));
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const generateRecaptcha = () => {
    try {
      window.recaptchaVerifier = new RecaptchaVerifier(
        smsAuthentication,
        "recaptcha-container"
      );
    } catch (err) {
      console.log("Gen captcha", err);
    }
  };

  const generateConfirmationOTP = () => {
    let appVerifier = window.recaptchaVerifier;
    setIsLoading(true);
    signInWithPhoneNumber(smsAuthentication, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setShowOTP(true);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const handleOnchange = (event, setState, validateState) => {
    let formatValue = event.target.value.trim();
    setState(formatValue);
    validateState(formatValue);
  };

  const validateFirstName = (firstName) => {
    if (!firstName) {
      setValidFirstName(false);
    } else setValidFirstName(true);
  };

  const validateLastName = (lastName) => {
    if (!lastName) {
      setValidLastName(false);
    } else setValidLastName(true);
  };

  const validatePhoneNumber = (phoneNumber) => {
    if (!phoneNumber) setValidPhoneNumber(false);
    else setValidPhoneNumber(true);
  };

  const validatePassword = (password) => {
    if (!password) setValidPassword(false);
    else setValidPassword(true);
  };

  const handleIdentifyPhoneNumber = () => {
    if (phoneNumber) {
      generateRecaptcha();
      generateConfirmationOTP();
    } else {
      setValidPhoneNumber(false);
    }
  };

  const validateOTP = () => {
    console.log("OTP validate");
  };

  const registerNewUser = async () => {
    setIsLoading(true);
    const response = await fetch(`${SERVER_URL}/user/register`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        userData: {
          firstName,
          lastName,
          password,
          phoneNumber,
        },
      }),
    });
    setIsLoading(false);
    return await response.json();
  };

  const handleVerifyOTP = () => {
    setIsLoading(true);
    let otpconfirm = window.confirmationResult;
    otpconfirm
      .confirm(otp)
      .then((user) => {
        setValidOTP(true);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setValidOTP(false);
        setIsLoading(false);
      });
  };

  const handleOnRegister = () => {
    registerNewUser()
      .then((result) => console.log(result))
      .catch((e) => console.log(e));
  };

  const ErrorMessage = ({ message }) => {
    return (
      <span style={{ fontSize: "0.75rem", color: "red", fontStyle: "italic" }}>
        {message}
      </span>
    );
  };

  return showModal ? (
    <div className={styles["register-modal"]}>
      <div className={styles["register-modal-body"]}>
        <div
          onClick={handleCloseModal}
          className={styles["close-register-modal"]}
        >
          <i className="fa fa-times" aria-hidden="true"></i>
        </div>
        <div className={styles["register-modal-header"]}>
          <h1>Đăng kí nhanh chóng, dễ dàng giao dịch</h1>
        </div>
        <div className={styles["form-register"]}>
          <div className={styles["group-button"]}>
            <label>Firstname</label>
            {!validFirstName ? (
              <ErrorMessage message="First name is required" />
            ) : null}
            <input
              type="text"
              onChange={(e) =>
                handleOnchange(e, setFirstName, validateFirstName)
              }
              value={firstName}
            />
          </div>
          <div className={styles["group-button"]}>
            <label>Lastname</label>
            {!validLastName ? (
              <ErrorMessage message="Last name is required" />
            ) : null}
            <input
              type="text"
              onChange={(e) => handleOnchange(e, setLastName, validateLastName)}
              value={lastName}
            />
          </div>
          <div className={styles["group-button"]}>
            <label>Phone number</label>
            {!validPhoneNumber ? (
              <ErrorMessage message="Phone number is required" />
            ) : null}
            <input
              type="text"
              maxLength={13}
              onChange={(e) =>
                handleOnchange(e, setPhoneNumber, validatePhoneNumber)
              }
              value={phoneNumber}
            />
          </div>
          <div className={styles["group-button"]}>
            <label>Password</label>
            {!validPassword ? (
              <ErrorMessage message="Password is required" />
            ) : null}
            <input
              type="text"
              onChange={(e) => handleOnchange(e, setPassword, validatePassword)}
              value={password}
            />
          </div>
          <div className={styles["group-button"]}>
            <span>Date Of Birth</span>
            <div className={styles["date-of-birth"]}>
              <select>
                {dates.map((date) => (
                  <option key={date.toString()}>{date}</option>
                ))}
              </select>
              <select>
                {monthOptions.map((item) => (
                  <option key={item.toString()}>{item}</option>
                ))}
              </select>
              <select>
                {years.map((year, index) =>
                  index != 100 ? (
                    <option key={year.toString()}>{year}</option>
                  ) : (
                    <option key={year.toString()} selected>
                      {year}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>
        </div>
        {showOTP ? (
          <>
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                width: "100%",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <h4 style={{ paddingRight: "10px" }}>OTP</h4>
              <input
                type="text"
                style={{ width: "100%", padding: "5px 0px" }}
                onChange={(e) => handleOnchange(e, setOtp, validateOTP)}
                value={otp}
              ></input>
            </div>
          </>
        ) : null}
        <div id="recaptcha-container"></div>
        {!isLoading ? (
          <button
            className={styles["register-button"]}
            onClick={
              !showOTP
                ? handleIdentifyPhoneNumber
                : validOTP
                ? handleOnRegister
                : handleVerifyOTP
            }
          >
            {!showOTP
              ? "Identify PhoneNumber"
              : validOTP
              ? "Register"
              : "Verify OTP"}
          </button>
        ) : (
          <button
            className={styles["register-button"]}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Loader />
          </button>
        )}
      </div>
    </div>
  ) : null;
};
