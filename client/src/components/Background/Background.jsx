import React from "react";
import PropTypes from "prop-types";

const Background = ({ children }) => {
  return (
    <div className="h-full">
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/cb17c41d-6a67-4472-8b91-cca977e65276/web/IN-en-20250505-TRIFECTA-perspective_03ae1a85-5dcf-4d20-a8a6-1e61f7ef73cb_medium.jpg"
          alt="background"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
};

Background.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Background;
