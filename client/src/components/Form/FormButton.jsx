import React from "react";
import PropTypes from "prop-types";

const FormButton = ({ type = "submit", children, className = "" }) => {
  return (
    <button
      type={type}
      className={`bg-red-600 text-white p-4 rounded font-bold hover:bg-red-700 ${className}`}
    >
      {children}
    </button>
  );
};

FormButton.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default FormButton;
