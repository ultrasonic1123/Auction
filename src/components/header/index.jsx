import { Link } from "react-router-dom";
import DLogo from "../../assets/D.png";
import femaleSVG from "../../assets/svg/female.svg";
import maleSVG from "../../assets/svg/male.svg";
import styles from "./header.module.css";
const DashboardHeader = () => {
  return (
    <>
      <div className={styles["header-container"]}>
        <div className={styles["header-logo"]}>
          <img src={DLogo} />
          <span className={styles["header-logo-text"]}>AUTION</span>
        </div>
        <div className={styles["header-search-bar"]}>
          <input placeholder="Tìm kiếm phiên đấu giá"></input>
          <i class="fa fa-search" aria-hidden="true"></i>
        </div>
        <div className={styles["header-user"]}>
          <Link to="/login">
            <span>Login</span>
          </Link>
        </div>
      </div>
      <hr />
    </>
  );
};

export default DashboardHeader;
