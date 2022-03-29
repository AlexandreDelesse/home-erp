import React, { useState } from "react";
import PropTypes from "prop-types";
import { Input, Button } from "reactstrap";

function CreateRewardForm(props) {
  const { onSubmit } = props;

  const [reward, setReward] = useState({
    rewardName: "",
    rewardCondition: "",
    rewardPoints: 0,
  });

  const handleOnFormChange = (e) => {
    const { name, value } = e.target;
    setReward((old) => {
      return { ...old, [name]: value };
    });
  };

  const handleOnSubmit = () => {
    onSubmit(reward);
  };

  return (
    <>
      <Input
        type="text"
        name="rewardName"
        value={reward.rewardName}
        onChange={handleOnFormChange}
        placeholder="Nom de la recompense"
        className="m-2"
      />
      <Input
        type="text"
        name="rewardCondition"
        value={reward.rewardCondition}
        onChange={handleOnFormChange}
        placeholder="Condition"
        className="m-2"
      />
      <Input
        type="text"
        name="rewardPoints"
        value={reward.rewardPoints}
        onChange={handleOnFormChange}
        placeholder="Points"
        className="m-2"
      />
      <Button onClick={handleOnSubmit} className="m-2">
        Ajouter
      </Button>
    </>
  );
}

CreateRewardForm.propTypes = { onSubmit: PropTypes.func };
CreateRewardForm.defaultProps = { onSubmit: () => {} };

export default CreateRewardForm;
