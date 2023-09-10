import React from "react";
import DashboardHeader from "../../components/header";
import GlobalChat from "../../components/sidebar/globalChat";
import DashboardBody from "../../components/dashboardBody";
const Dashboard = () => {
  return (
    <>
      <DashboardHeader />
      <div style={{ display: "flex", background: "rgb(245, 245, 245" }}>
        <GlobalChat />
        <DashboardBody />
      </div>
    </>
  );
};

export default Dashboard;
