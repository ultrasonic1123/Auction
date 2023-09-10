import React from "react";
import styles from "./userCost.module.css";
export const UserCost = ({ isHighest, userName, price }) => {
  return (
    <>
      <div
        style={{
          width: "100%",
          backgroundColor: "rgba(0, 0, 0, 0, 0.75)",

          height: "100px",
          borderBottom: "1px solid grey",
        }}
        className={styles["box"]}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
          className={isHighest ? styles["highest-price"] : null}
        >
          {userName ? (
            <>
              <span>User Name: {userName}</span>
              <span>Money: {price}</span>
            </>
          ) : (
            <span>BID</span>
          )}
        </div>
      </div>
    </>
  );
};
