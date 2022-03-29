import React from "react";
import PropTypes from "prop-types";
import "./formWrapper.css";

function FormWrapper({ children }) {
  return <div className="formWrapper">{children}</div>;
}

FormWrapper.propTypes = {
  children: PropTypes.node,
};

FormWrapper.defaultProps = {
  children: <></>,
};

export default FormWrapper;
