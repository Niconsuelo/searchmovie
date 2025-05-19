import React from "react";
import "../styles/ButtonNav.css";

interface ButtonProps {
  text: string;
  onClick: () => void;
}
const ButtonNav: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <div className="container-button">
      <button onClick={onClick} className={`button-nav-bar`}>
        {text}
      </button>
    </div>
  );
};

export default ButtonNav;
