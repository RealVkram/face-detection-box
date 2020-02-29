import React from "react";
import "./Rank.Component.css";



const Rank = ({ onCount }) => {

  const date = new Date();
  const zerothCount = (
    <div>
      <div className="white f3">
        <p>{"Hey Victor, you have detected "}</p>
      </div>
      <div className="white f1 count">
        <p>{onCount + " face today - " + date.getDate()}</p>
      </div>
    </div>
  );

  const proCount = (
    <div>
      <div className="white f3">
        <p>{"Hey Victor, you have detected "}</p>
      </div>
      <div className="white f1 count">
        <p>{`${onCount} faces today - ` + date.getDate()}</p>
      </div>
    </div>
  );

  return onCount <= 1 ? zerothCount : proCount;
};

export default Rank;
