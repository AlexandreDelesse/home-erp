import React from "react";
import "../../../styles/cards.css";

export default function BasicCard({ children, onClick }) {
  return (
    <div onClick={onClick} className="basicCardWrapper">
      {children}
    </div>
  );
}
