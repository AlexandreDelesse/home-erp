import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import useGetTrainings from "../../../hooks/query/trainings/useGetTrainings";
import BackButton from "../../buttons/BackButton";
import BasicCard from "../../cards/basicCard/BasicCard";
import AsyncComponent from "../../tools/AsyncComponent";

import "./trainingPage.css";

export default function TrainingPage() {
  const trainings = useGetTrainings();
  const navigate = useNavigate();

  const [training, setTraining] = useState(null);

  const handleOnTrainingClick = (training) => {
    setTraining(training);
    navigate("detail", { training });
  };

  return (
    <div>
      <BackButton />
      <AsyncComponent query={trainings}>
        <Routes>
          <Route
            path="/"
            element={
              <TrainingList
                onClick={handleOnTrainingClick}
                trainings={trainings.data}
              />
            }
          />
          {training && (
            <Route
              path="detail"
              element={<TrainingDetail training={training} />}
            />
          )}
        </Routes>
      </AsyncComponent>
    </div>
  );
}

const TrainingList = ({ trainings, onClick }) => {
  const handleOnTrainingClick = (training) => {
    onClick(training);
  };

  return (
    <div className="trainingList">
      {trainings.map((training) => (
        <BasicCard key={training.id}>
          <div
            onClick={() => handleOnTrainingClick(training)}
            className="trainingCard"
          >
            {training.name}
          </div>
        </BasicCard>
      ))}
    </div>
  );
};

const TrainingDetail = ({ training }) => {
  console.log(training);
  return (
    <div>
      <div className="trainingName">{training.name}</div>
      <div className="activityList">
        {training.activities.map((activity) => (
          <Activity title={activity.exercice.name} activity={activity}>
            <div>
              {activity.series.map((serie) => (
                <Serie serie={serie} />
              ))}
            </div>
          </Activity>
        ))}
      </div>
    </div>
  );
};

const Activity = ({ title, children }) => {
  return (
    <div className="activityWrapper">
      <div className="activityTitle">{title}</div>
      <div>{children}</div>
    </div>
  );
};

const Serie = ({ serie }) => {
  return (
    <div className="serieWrapper">
      <div className="serieReps">{serie.reps} Reps</div>
      <div>x</div>
      <div className="serieWeight">{serie.weight} Kg</div>
    </div>
  );
};
