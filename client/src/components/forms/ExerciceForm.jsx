import React, { useEffect, useState } from "react";
import { Input } from "reactstrap";
import ClassicButton from "../buttons/ClassicButton";

export default function ExerciceForm({ onChange, className }) {
  const [exercice, setExercice] = useState({
    name: "",
    variant: "",
    difficulty: "",
    category: "",
    type: "",
  });

  const handleOnInputChange = (e) => {
    const { name, value } = e.target;
    setExercice((old) => ({ ...old, [name]: value }));
  };

  useEffect(() => {
    onChange(exercice);
  }, [exercice]);

  return (
    <>
      <Input
        className="w-25 my-2"
        type="text"
        name="name"
        value={exercice.name}
        onChange={handleOnInputChange}
        placeholder="name"
      />
      <Input
        className="w-25 my-2"
        type="text"
        name="variant"
        value={exercice.variant}
        onChange={handleOnInputChange}
        placeholder="variant"
      />
    </>
  );
}
