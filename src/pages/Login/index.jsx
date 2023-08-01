import React, { useCallback, useEffect } from "react";
import styles from "./login.module.css";
import { RegisterModal } from "../../components/Login/RegisterModal";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { USER_LOGIN_REQUESTED } from "../../redux/actions/user";
const Login = () => {
  const user = useSelector((state) => state.login);
  const [moreActionsOnRegisterForm, setMoreActionsOnRegisterForm] = useState({
    showModal: () => {},
  });
  const dispatcher = useDispatch();
  const [userData, setUserData] = useState({
    phoneNumber: "",
    password: "",
  });

  const hanldeChangeUserName = useCallback((e) => {
    setUserData((userData) => ({
      ...userData,
      phoneNumber: e.target.value,
    }));
  }, []);

  const hanldeChangePassword = useCallback((e) => {
    setUserData((userData) => ({
      ...userData,
      password: e.target.value,
    }));
  }, []);

  const handleLoginEvent = () => {
    dispatcher({ type: USER_LOGIN_REQUESTED, userData });
  };
  useEffect(() => {
    console.log({ user });
  }, [user]);
  return (
    <div className={styles["login-container"]}>
      <div className={styles["section-login-introduction"]}>
        <div>
          <h1>Ken Auction</h1>
          <p>Có được những gì bạn muốn</p>
        </div>
      </div>
      <div className={styles["section-login-form"]}>
        <div className={styles["group-button"]}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            placeholder="Email or phonenumber"
            onChange={hanldeChangeUserName}
            value={userData.phoneNumber}
          />
        </div>
        <div className={styles["group-button"]}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            onChange={hanldeChangePassword}
            value={userData.password}
          />
        </div>
        <div className={styles["submit-login-form"]}>
          <button className={styles["login-button"]} onClick={handleLoginEvent}>
            Login
          </button>
        </div>
        <span className={styles["forgot-password"]}>Forgot password?</span>
        <button
          onClick={() => moreActionsOnRegisterForm.showModal(true)}
          className={styles["register-button"]}
        >
          Register
        </button>
      </div>
      <RegisterModal onMoreActions={setMoreActionsOnRegisterForm} />
    </div>
  );
};

export default Login;
