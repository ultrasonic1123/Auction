import React from "react";
import styles from "./login.module.css";
import { RegisterModal } from "../../components/Login/RegisterModal";
import { useState } from "react";
const Login = () => {
  const [moreActionsOnRegisterForm, setMoreActionsOnRegisterForm] = useState({
    showModal: () => {},
  });

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
          <input id="username" type="text" placeholder="Email or phonenumber" />
        </div>
        <div className={styles["group-button"]}>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" placeholder="Password" />
        </div>
        <div className={styles["submit-login-form"]}>
          <button className={styles["login-button"]}>Login</button>
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
