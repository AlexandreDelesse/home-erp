import React from "react";
import { useNavigate } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import "./button.css";

export default function BackButton() {
  const navigate = useNavigate();
  return (
    <div className="backButtonWrapper" onClick={() => navigate(-1)}>
      <IoChevronBack />
      <div>Go back</div>
    </div>
  );
}
