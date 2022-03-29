import React, { useState } from "react";
import PropTypes from "prop-types";
import CreateRewardForm from "../forms/CreateRewardForm";
import "./rewardCard.css";
import { GrClose } from "react-icons/gr";
import { MdEdit } from "react-icons/md";

function RewardCard(props) {
  const { reward, onEdit, onDelete } = props;
  const [isEditMode, setIsEditMode] = useState(false);

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleOnDelete = () => {
    onDelete(reward.rewardId);
  };

  const handleOnEdit = (rewardUpdated) => {
    onEdit({ id: reward.rewardId, reward: rewardUpdated });
  };

  return (
    <div className="rewardCardWrapper">
      <MdEdit className="editIcon" onClick={onEdit} size="10px" />

      <GrClose className="closeIcon" onClick={handleOnDelete} size="10px" />

      {isEditMode ? (
        <CreateRewardForm onSubmit={handleOnEdit} />
      ) : (
        <>
          <div>{reward.rewardName || "no name"}</div>
          <div>{reward.rewardCondition || "no description"}</div>
          <div>{reward.rewardPoints || 0}</div>
        </>
      )}
    </div>
  );
}

RewardCard.propTypes = {
  reward: PropTypes.instanceOf(Object),
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
};

RewardCard.defaultProps = {
  reward: {},
  onDelete: () => {},
  onEdit: () => {},
};

export default RewardCard;
