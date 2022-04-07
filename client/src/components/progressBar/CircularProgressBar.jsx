import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function CircularProgressBar({ value }) {
  return <CircularProgressbar value={value} text={`${value}%`} />;
}
