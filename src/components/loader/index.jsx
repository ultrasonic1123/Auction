import React from "react";
import styles from "./loader.module.css";
const Loader = ({ width, height }) => {
  return (
    <div
      className={styles["loader"]}
      style={{ width: width, height: height }}
    ></div>
  );
};

export default Loader;
