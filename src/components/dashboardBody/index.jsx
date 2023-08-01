import React from "react";
import SliceShow from "../sliceShow";
import Notify from "../notify";
import CategoriesList from "../categogies";
import styles from "./dashboardBody.module.css";
const DashboardBody = () => {
  return (
    <div style={{ width: "75%" }}>
      <div className={styles["upper-body"]}>
        <SliceShow />
        {/* <Notify /> */}
      </div>
      <div>
        <h2>Categories</h2>
        <CategoriesList />
      </div>
      <div>
        <h2>Preparing Auction</h2>
      </div>
    </div>
  );
};

export default DashboardBody;
