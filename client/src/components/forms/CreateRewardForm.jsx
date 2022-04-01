import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Input, Button } from "reactstrap";

function CreateRewardForm(props) {
  const { onSubmit } = props;

  const [reward, setReward] = useState({
    condition: "",
    points: 0,
    category: "",
    subCategory: "",
  });

  const resetForm = () => {
    setReward({
      condition: "",
      points: 0,
      category: "",
      subCategory: "",
    });
  };

  const checkForm = () => {
    return !reward.condition || reward.points === 0;
  };

  const handleOnFormChange = (e) => {
    const { name, value } = e.target;
    setReward((old) => {
      return { ...old, [name]: value };
    });
  };

  const handleOnSubmit = () => {
    if (!checkForm()) {
      onSubmit(reward);
      resetForm();
    } else {
      return;
    }
  };

  const handleOnCategoryChange = (categories) => {
    setReward((old) => ({ ...old, categories }));
  };

  return (
    <>
      <Input
        type="text"
        name="condition"
        value={reward.condition}
        onChange={handleOnFormChange}
        placeholder="Condition"
        className="m-2"
      />
      <Input
        type="text"
        name="points"
        value={reward.points}
        onChange={handleOnFormChange}
        placeholder="Points"
        className="m-2"
      />
      <Input
        type="text"
        name="category"
        value={reward.category}
        onChange={handleOnFormChange}
        placeholder="categorie"
        className="m-2"
      />
      <Input
        type="text"
        name="subCategory"
        value={reward.subCategory}
        onChange={handleOnFormChange}
        placeholder="sous categorie"
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
