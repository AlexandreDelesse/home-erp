import React, { useState, useReducer } from "react";

import { IoClose } from "react-icons/io5";
import { BiPlus } from "react-icons/bi";
import { MdEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { FiCheck } from "react-icons/fi";

import "./button.css";

export default function ButtonBar({ onEdit, onDelete, onAdd }) {
  const [confirm, setConfirm] = useState(false);
  function reducer(state, action) {
    switch (action.type) {
      case "onConfirm":
        return { ...state, onConfirm: action.data };
      case "confirm":
        return { ...state, confirm: action.data };

      default:
        throw new Error();
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    onConfirm: () => {},
    confirm: false,
  });

  const onIconClick = (next) => {
    dispatch({ type: "confirm", data: true });
    dispatch({ type: "onConfirm", data: next });
  };

  const onConfirmClick = () => {
    state.onConfirm();
    dispatch({ type: "confirm", data: false });
  };

  const onCancelClick = () => {
    dispatch({ type: "confirm", data: false });
  };

  return (
    <div className="activityButtonBar">
      {!state.confirm ? (
        <>
          <FaTrashAlt
            className="buttonBarIcon"
            onClick={() => onIconClick(onDelete)}
            size="14px"
          />
          <MdEdit
            className="buttonBarIcon"
            onClick={() => onIconClick(onEdit)}
            size="18px"
          />
          <BiPlus
            className="buttonBarIcon"
            onClick={() => onIconClick(onAdd)}
            size="24px"
          />
        </>
      ) : (
        <ConfirmBar onCancel={onCancelClick} onConfirm={onConfirmClick} />
      )}
    </div>
  );
}

const ConfirmBar = ({ onConfirm, onCancel }) => {
  return (
    <>
      <IoClose className="buttonBarIcon" onClick={onCancel} size="24px" />

      <FiCheck className="buttonBarIcon" onClick={onConfirm} size="24px" />
    </>
  );
};
