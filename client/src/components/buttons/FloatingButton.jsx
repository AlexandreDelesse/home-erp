import React from "react";
import { Spinner } from "reactstrap";

import "./button.css";

export default function FloatingButton({
  onClick,
  children,
  className,
  loading,
}) {
  return (
    <div onClick={onClick} className={`floatingButtonWrapper ${className}`}>
      {loading ? <Spinner /> : children}
    </div>
  );
}
