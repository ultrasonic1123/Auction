import React, { useCallback, useEffect, useState } from "react";
import styles from "../../assets/css/login/registerModal.module.css";
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
  useEffect(() => {
    onMoreActions((pre) => ({ ...pre, showModal: setShowModal }));
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

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
            <input type="text" />
          </div>
          <div className={styles["group-button"]}>
            <label>Lastname</label>
            <input type="text" />
          </div>
          <div className={styles["group-button"]}>
            <label>Phone number</label>
            <input type="text" maxLength={10} />
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
                {years.map((year) => (
                  <option key={year.toString()}>{year}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <button className={styles["register-button"]}>Register</button>
      </div>
    </div>
  ) : null;
};
