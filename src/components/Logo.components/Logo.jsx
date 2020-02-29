import React from "react";
import Tilt from "react-tilt";
import "./logo.css";
import logo from "./logo.png"

const Logo = () => {
  return (
    <div className="ma3 mt0 v-top">
      <Tilt
        className="Tilt br2 shadow-2"
        options={{ max: 55, }}
        style={{ height: 100, width: 100 }}
      >
        <div className="Tilt-inner pa2"> 
          <img style={{paddingTop: '0em'}} alt="company logo" src={logo}/>
        </div>
      </Tilt>
    </div>
  );
};
export default Logo;
