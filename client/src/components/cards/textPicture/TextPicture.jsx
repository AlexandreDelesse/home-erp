import React from "react";
import { BiUser } from "react-icons/bi";
import "./textPicture.css";

export default function TextPicture({ img, text, onClick }) {
  return (
    <div className="textPictureWrapper" onClick={onClick}>
      <div>{text}</div>
      <BiUser size='25px' />
    </div>
  );
}
