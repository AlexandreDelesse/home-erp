import React from "react";
import { Input, Button } from "reactstrap";

export default function CreateActivityForm() {
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
    </>
  );
}
