import React from "react";
import netflixLogo from "../assets/Netflix_Logo_RGB.png";

const Header = () => {
  return (
    <div className="bg-[url('https://assets.nflxext.com/ffe/siteui/vlv3/9c5457b8-9ab0-4a04-9fc1-e608d5670f1a/710d74e0-7158-408e-8d9b-23c219dee5b5/US-en-20210719-popsignuptwoweeks-perspective_alpha_website_small.jpg')] bg-cover bg-center h-screen">
      <img src={netflixLogo} alt="Netflix Logo" />
    </div>
  );
};

export default Header;
