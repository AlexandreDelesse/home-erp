import React from "react";
import PropTypes from "prop-types";
import "./rewardCard.css";
import { GrClose } from "react-icons/gr";
import { HiFlag } from "react-icons/hi";

import { Card, CardBody, CardTitle, CardText, CardHeader } from "reactstrap";

function RewardCard(props) {
  const { reward, onDelete } = props;

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

RewardCard.propTypes = {
  reward: PropTypes.instanceOf(Object),
  onDelete: PropTypes.func,
};

RewardCard.defaultProps = {
  reward: {},
  onDelete: () => {},
};

export default RewardCard;
