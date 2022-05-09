import React, { useState } from "react";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";

import BackButton from "../../buttons/BackButton";

import useGetExercices from "../../../hooks/query/useGetExercices";
import useGetExerciceById from "../../../hooks/query/useGetExerciceById";

import "./exercicePage.css";
import ClassicButton from "../../buttons/ClassicButton";
import useDeleteExercice from "../../../hooks/mutations/exercice/useDeleteExercice";
import useCreateExercice from "../../../hooks/mutations/exercice/useCreateExercice";
import ExerciceForm from "../../forms/ExerciceForm";

export default function ExercicePage() {
  return (
    <div>
      <BackButton />
      <div className="workoutPageContent">
        <Routes>
          <Route path="/" element={<ExerciceList />} />
          <Route path=":id" element={<ExerciceDetail />} />
          <Route path="create" element={<ExerciceCreatePage />} />
        </Routes>
      </div>
    </div>
  );
}

const ExerciceList = () => {
  const exercices = useGetExercices();
  const navigate = useNavigate();

  const onExerciceClick = (id) => {
    navigate(`${id}`);
  };

  const onCreateExerciceClick = () => {
    navigate("create");
  };
  if (exercices.isLoading) return <>Loading</>;
  if (exercices.isError) return <>Error: {exercices.error.message}</>;
  return (
    <div>
      <ClassicButton onClick={onCreateExerciceClick}>
        Ajouter un exercice
      </ClassicButton>
      <div className="exerciceListWrapper mt-3">
        {exercices.data.map((exercice) => (
          <ExerciceShort
            title={exercice.name}
            id={exercice.id}
            onClick={onExerciceClick}
            key={exercice.id}
          />
        ))}
      </div>
    </div>
  );
};

const ExerciceShort = ({ id, title, onClick }) => {
  const handleOnClick = () => {
    onClick(id);
  };
  return (
    <div className="exerciceShortWrapper scaleOnHover" onClick={handleOnClick}>
      {title}{" "}
    </div>
  );
};

const ExerciceDetail = () => {
  const { id } = useParams();
  const exercice = useGetExerciceById(id);
  const deleteExercice = useDeleteExercice();
  const navigate = useNavigate();

  const handleOnDeleteExercice = async () => {
    try {
      await deleteExercice.mutateAsync(exercice.data.id);
      navigate(-1);
    } catch (err) {
    }
  };

  if (exercice.isLoading) return <>Loading</>;
  if (exercice.isError) return <>Error</>;

  return (
    <div>
      <ClassicButton
        onClick={handleOnDeleteExercice}
        loading={deleteExercice.isLoading}
      >
        Supprimer
      </ClassicButton>
      <div>{exercice.data.name}</div>
      <div>{exercice.data.type || "no type"} </div>
      <div>{exercice.data.category || "no category"} </div>
    </div>
  );
};

const ExerciceCreatePage = () => {
  const [exercice, setExercice] = useState(undefined);
  const createExercice = useCreateExercice();

  const handleOnChangeExercice = (exercice) => {
    setExercice(exercice);
  };

  const handleOnCreate = () => {
    if (!exercice) {
      return;
    }
    createExercice.mutate(exercice);
  };

  return (
    <div>
      <div className="exerciceCreateTitle">Create Exercice</div>
      <ExerciceForm onChange={handleOnChangeExercice} />
      <ClassicButton onClick={handleOnCreate}>Ajouter</ClassicButton>
    </div>
  );
};
