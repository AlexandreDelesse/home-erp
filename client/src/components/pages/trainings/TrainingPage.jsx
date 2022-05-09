import React from "react";
import useGetTrainings from "../../../hooks/query/trainings/useGetTrainings";
import BackButton from "../../buttons/BackButton";
import BasicCard from "../../cards/basicCard/BasicCard";
import AsyncComponent from "../../tools/AsyncComponent";

import "./trainingPage.css";

export default function TrainingPage() {
  const trainings = useGetTrainings();

  return (
    <div>
      <BackButton />
      <AsyncComponent query={trainings}>
        <TrainingList trainings={trainings.data} />
      </AsyncComponent>
    </div>
  );
}

const TrainingList = ({ trainings }) => {
  return (
    <div className="trainingList">
      {trainings.map((training) => (
        <BasicCard key={training.id}>
          <div className="trainingCard">{training.name}</div>
        </BasicCard>
      ))}
    </div>
  );
};
