import React from "react";
import "./imagelink.css";

const ImageLinkForm = ({onInputChange, onSubmitDetect}) => {
//  const  { onInputChange, onSubmitDetect } = this.props
  return (
    <div className="f3">
      <p>{"Kindly try the face detection Box"}</p>
      <div className="center">
        <div className="form center pa4 br2 shadow-2">
          <input
            className="f4 pa2 w-70 center"
            type="text"
            onChange={onInputChange}
            placeholder="paste URL1"
          />
          <button
            className="w-30 grow f4 link ph3 pv2 dib white bg-green"
            onClick={onSubmitDetect}
          >
            Match
          </button>
        </div>
      </div>
    </div>
  );
};
export default ImageLinkForm;
