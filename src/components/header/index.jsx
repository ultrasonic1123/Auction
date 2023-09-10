import { Link } from "react-router-dom";
import DLogo from "../../assets/D.png";
import styles from "./header.module.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const DashboardHeader = () => {
  const [isLogin, setIsLogin] = useState(false);
  const user = useSelector((state) => state.login);

  useEffect(() => {
    console.log({ user });
    if (user.token) {
      setIsLogin(true);
    } else setIsLogin(false);
  }, [user]);

  return (
    <>
      <div className={styles["header-container"]}>
        <Link to="/" style={{ color: "inherit" }}>
          <div className={styles["header-logo"]}>
            <img src={DLogo} />
            <span className={styles["header-logo-text"]}>AUTION</span>
          </div>
        </Link>
        <div className={styles["header-search-bar"]}>
          <input placeholder="Search Auction room..."></input>
          <i className="fa fa-search" aria-hidden="true"></i>
        </div>
        <div className={styles["header-user"]}>
          {isLogin ? (
            <div className={styles["menu-bar"]}>
              <span>
                Menu <i className="fa fa-bars" aria-hidden="true"></i>
              </span>
              <ul>
                <li>
                  <Link to="/create-new-auction">
                    <span>Create new aution</span>
                  </Link>
                </li>
                <li>
                  <Link to="/auction-room-history">
                    <span>Auction room history</span>
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/login">
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>
      <hr />
    </>
  );
};

export default DashboardHeader;
