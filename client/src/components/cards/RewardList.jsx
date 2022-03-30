import React from "react";
import { Card, CardBody, CardTitle, CardText, CardHeader } from "reactstrap";
import { GrClose } from "react-icons/gr";
import { HiFlag } from "react-icons/hi";
import "./rewardList.css";

function RewardList({ rewards, onDelete }) {
  return (
    <div className="rewardList">
      {rewards.map((reward) => (
        <RewardCard key={reward.rewardId} reward={reward} onDelete={onDelete} />
      ))}
    </div>
  );
}

RewardList.propTypes = {};

export default RewardList;

function RewardCard({ reward, onDelete }) {
  const handleOnDelete = () => {
    onDelete(reward.rewardId);
  };

  return (
    <Card className="rewardCardWrapper">
      <CardHeader>
        <GrClose
          className="icon closeIcon"
          onClick={handleOnDelete}
          size="10px"
        />
        <CardTitle tag="h5">{reward.rewardName || "no name"}</CardTitle>
      </CardHeader>
      <CardBody>
        <CardText>{reward.rewardCondition || "no description"}</CardText>
        <div>
          <HiFlag />
          {reward.rewardPoints || 0}
        </div>
      </CardBody>
    </Card>
  );
}
