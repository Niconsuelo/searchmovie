import React from "react";
import "../styles/LoaderAPI.css"; 

const Loader: React.FC = () => {
  return (
    <div className="background-loader">
      <div className="loader">
        <div className="loaderBar"></div>
      </div>
    </div>
  );
};

export default Loader;
