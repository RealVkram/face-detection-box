import React from "react";
import "./Rank.Component.css";

const Rank = ({ name, entries }) => {

  return (
      <div>
        <div className="white f3">
          <p>
            {`Hey ${name}, your current entry count is ...`}
          </p>
        </div>
        <div className="white f1 count">
          <p>{
              `#${entries}` 
            }                      
          </p>
        </div>
      </div>
  )    
   
}

export default Rank;
