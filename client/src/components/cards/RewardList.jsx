import React from "react";
import { Card, CardBody, CardTitle, Button, CardHeader } from "reactstrap";
import { GrClose } from "react-icons/gr";
import { HiFlag } from "react-icons/hi";
import "./rewardList.css";

function RewardList({ rewards, onDelete, onClaim }) {
  return (
    <div className="rewardList">
      {rewards.map((reward) => (
        <RewardCard
          key={reward.id}
          reward={reward}
          onDelete={onDelete}
          onClaim={onClaim}
        />
      ))}
    </div>
  );
}

RewardList.propTypes = {};

export default RewardList;

function RewardCard({ reward, onDelete, onClaim }) {
  const handleOnDelete = () => {
    onDelete(reward.id);
  };

  const handleOnClaim = () => {
    onClaim({ id: reward.id, reward: { status: true } });
  };

  return (
    <Card className="rewardCardWrapper">
      <CardHeader
        className={`rewardCardHeader ${reward.status ? "bg-success" : null}`}
      >
        <CardTitle tag="h5">{reward.condition || "no name"}</CardTitle>
        <GrClose className="icon" onClick={handleOnDelete} size="12px" />
      </CardHeader>
      <CardBody className="rewardBody">
        <div>
          <HiFlag />
          {reward.points || 0}
        </div>
        <Button
          onClick={handleOnClaim}
          color="primary"
          disabled={reward.status}
        >
          Claim
        </Button>
      </CardBody>
    </Card>
  );
}
