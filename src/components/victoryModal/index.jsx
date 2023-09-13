const VictoryModal = ({ user, isOpen, setIsOpen }) => {
  return isOpen ? (
    <div
      style={{
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        top: "0px",
        left: "0px",
        right: "0px",
        bottom: "0px",
        backgroundColor: "rgba(245, 245, 245, 0.75)",
        zIndex: 999,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
          borderRadius: "5px",
          position: "relative",
          boxShadow: "0px 0px 8px grey",
          padding: "20px",
        }}
      >
        <i
          className="fa fa-trophy"
          aria-hidden="true"
          style={{
            fontSize: "3rem",
            color: "#fbe106",
          }}
        ></i>
        <span style={{ position: "absolute", fontWeight: 700, top: "30px" }}>
          1
        </span>
        <i
          style={{ position: "absolute", top: "10px", right: "20px" }}
          className="fa fa-times-circle"
          aria-hidden="true"
          onClick={() => setIsOpen(false)}
        ></i>
        <h2>Congratulation {user.user}</h2>
        <h2>Phone: +84XXXXXXX{user.phoneNumber.slice(9, 13)}</h2>
        <h3>You are the winer of this auction</h3>
      </div>
    </div>
  ) : null;
};

export default VictoryModal;
