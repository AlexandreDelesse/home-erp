import React, { useState } from "react";
import { Input } from "reactstrap";
import ClassicButton from "../buttons/ClassicButton";

export default function CreateSerieForm({ onAdd, className }) {
  const [serie, setSerie] = useState({ reps: 0, weight: 0 });

  const handleOnInputChange = (e) => {
    const { name, value } = e.target;
    setSerie((old) => ({ ...old, [name]: value }));
  };

  const handleOnAdd = () => {
    if (!serie.reps) return;
    onAdd(serie);
    setSerie({ reps: 0, weight: 0 });
  };

  return (
    <>
      <Input
        className="w-25 m-2"
        type="text"
        name="reps"
        value={serie.reps}
        onChange={handleOnInputChange}
        placeholder="Repetitions"
      />
      <Input
        className="w-25 m-2"
        type="text"
        name="weight"
        value={serie.weight}
        onChange={handleOnInputChange}
        placeholder="Poid"
      />

      <ClassicButton className="m-2" onClick={handleOnAdd}>
        Add
      </ClassicButton>
    </>
  );
}
