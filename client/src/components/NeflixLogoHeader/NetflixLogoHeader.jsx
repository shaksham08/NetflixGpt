import React from "react";
import netflixLogo from "../../assets/Netflix_Logo_RGB.png";
import { Link } from "react-router";

const NetflixLogoHeader = () => {
  return (
    <header className="px-[10%]">
      <div className="px-12 py-4">
        <Link to="/">
          <img
            className="w-[190px] h-[80px]"
            src={netflixLogo}
            alt="netflix logo"
          />
        </Link>
      </div>
    </header>
  );
};

export default NetflixLogoHeader;
