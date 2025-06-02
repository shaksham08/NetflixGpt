import React from "react";
import PropTypes from "prop-types";
import { ErrorMessage } from "@hookform/error-message";

const FormInput = ({
  register,
  name,
  type = "text",
  placeholder,
  errors,
  className = "",
}) => {
  return (
    <div className="flex flex-col gap-1">
      <input
        {...register(name)}
        type={type}
        placeholder={placeholder}
        className={`p-4 rounded bg-gray-700 text-white ${
          errors[name] ? "border border-red-500" : ""
        } ${className}`}
      />
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => (
          <p className="text-red-500 text-sm mt-1">{message}</p>
        )}
      />
    </div>
  );
};

FormInput.propTypes = {
  register: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default FormInput;
