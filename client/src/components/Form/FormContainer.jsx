import React from "react";
import PropTypes from "prop-types";

const FormContainer = ({ children, title }) => {
  return (
    <div className="bg-black/75 p-16 rounded-md w-full max-w-md">
      <h1 className="text-3xl font-bold text-white mb-8">{title}</h1>
      {children}
    </div>
  );
};

FormContainer.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default FormContainer;
