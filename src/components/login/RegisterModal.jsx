import React, { useCallback, useEffect, useState } from "react";
import styles from "../../assets/css/login/registerModal.module.css";
import smsAuthentication from "../../firebase";
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
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
  const [validPhoneNumber, setValidPhoneNumber] = useState(true);
  const [validFirstName, setValidFirstName] = useState(true);
  const [validLastName, setValidLastName] = useState(true);
  useEffect(() => {
    onMoreActions((pre) => ({ ...pre, showModal: setShowModal }));
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const checkOTP = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      smsAuthentication,
      "recaptcha-container",
      {
        size: "invisible",
      }
    );
    let appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(smsAuthentication, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        confirmationResult.confirm(otp).then((user) => {
          setValidOTP(true);
        });
      })
      .catch((err) => {
        setValidOTP(false);
      });
  };

  const handleOnchange = (event, setState, validateState) => {
    let formatValue = event.target.value.trim();
    console.log({ formatValue });
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

  const handleIdentifyPhoneNumber = () => {
    if (phoneNumber) setShowOTP(true);
    else {
      setValidPhoneNumber(false);
    }
  };

  const validateOTP = () => {};

  const handleOnRegister = () => {
    checkOTP();
  };

  const ErrorMessage = ({ message }) => {
    return (
      <span style={{ fontSize: "0.75rem", color: "red", fontStyle: "italic" }}>
        {message}
      </span>
    );
  };

  useEffect(() => {
    console.log(firstName, lastName, phoneNumber);
  }, [firstName, lastName, phoneNumber]);

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
              }}
            >
              <h4 style={{ paddingRight: "10px" }}>OTP</h4>
              <input
                type="text"
                onChange={(e) => handleOnchange(e, setOtp, validateOTP)}
                value={otp}
              ></input>
            </div>
            <div id="recaptcha-container"></div>
          </>
        ) : null}
        <button
          className={styles["register-button"]}
          onClick={!showOTP ? handleIdentifyPhoneNumber : handleOnRegister}
        >
          {!showOTP ? "Identify PhoneNumber" : "Register"}
        </button>
      </div>
    </div>
  ) : null;
};
