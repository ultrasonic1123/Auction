import { useLocation } from "react-router-dom";
import AuctionRoom from "../../components/auctionRoom";
import DashboardHeader from "../../components/header";

const SearchResult = () => {
  const { state } = useLocation();
  console.log(state);
  return (
    <>
      <DashboardHeader />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <h1 style={{ marginBottom: "30px" }}>Search Result</h1>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {state.roomsResult.map((item) => (
            <AuctionRoom data={item} key={item._id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchResult;
