import React from "react";
import spinner from "./spinner.gif";
const Spinner = () => {
  return (
    <div>
      <img
        src={spinner}
        style={{
          width: "100",
          margin: "auto",
          marginTop: "200px",
          display: "block",
          backgroundColor: "white",
        }}
        alt="Loading..."
      />
    </div>
  );
};
export default Spinner;
