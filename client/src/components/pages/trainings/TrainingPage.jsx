import React, { useReducer, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import useGetTrainings from "../../../hooks/query/trainings/useGetTrainings";
import BackButton from "../../buttons/BackButton";
import BasicCard from "../../cards/basicCard/BasicCard";
import AsyncComponent from "../../tools/AsyncComponent";
import {
  trainingInProgressReducer,
  initalState,
} from "../../../reducers/trainingInProgress.reducer";

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
            <>
              <Route
                path="detail"
                element={<TrainingDetail training={training} />}
              />
              <Route
                path="trainingInProgress"
                element={<TrainingInProgress training={training} />}
              />
            </>
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
  const navigate = useNavigate();
  const handleOnStartWorkout = () => {
    navigate("../trainingInProgress", { replace: true });
  };

  return (
    <div>
      <div className="trainingName">{training.name}</div>
      <div className="activityList">
        {training.activities.map((activity) => (
          <Activity
            key={activity.id}
            title={activity.exercice.name}
            activity={activity}
          >
            <div>
              {activity.series.map((serie) => (
                <Serie key={serie.id} serie={serie} />
              ))}
            </div>
          </Activity>
        ))}
      </div>
      <BottomBanner
        className="bottomBannerWrapper"
        left={<button>Program workout</button>}
        right={<button onClick={handleOnStartWorkout}>Do workout</button>}
      />
    </div>
  );
};

const BottomBanner = ({ left, right, className }) => {
  return (
    <div className={className}>
      <div>{left}</div>
      <div>{right}</div>
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

const TrainingInProgress = ({ training }) => {
  const [activityStep, setActivityStep] = useState(0);
  const [serieStep, setSerieStep] = useState(0);

  const handleOnNextActivity = () => {
    const maxStep = training.activities.length - 1;
    setActivityStep((old) => (old === maxStep ? old : old + 1));
  };

  const handleOnNextSerie = () => {
    const maxStep = training.activities[activityStep].series.length - 1;
    setSerieStep((old) => (old === maxStep ? old : old + 1));
  };

  return (
    <div className="trainingInProgressWrapper">
      <ActivityInProgress activity={training.activities[activityStep]}>
        <SerieInProgress
          serie={training.activities[activityStep].series[serieStep]}
        />
      </ActivityInProgress>
      <button onClick={handleOnNextActivity}>next activity</button>
      <button onClick={handleOnNextSerie}>next serie</button>
    </div>
  );
};

const ActivityInProgress = ({ activity, children }) => {
  return (
    <div className="activityInProgress">
      <div className="activityExerciceTitle">{activity.exercice.name}</div>
      <div>{children}</div>
    </div>
  );
};

const SerieInProgress = ({ serie }) => {
  const [weight, setWeight] = useState(serie.weight);
  const [reps, setReps] = useState(serie.reps);

  const handleOnIncreaseReps = () => {
    setReps((old) => old + 1);
  };

  const handleOnDecreaseReps = () => {
    setReps((old) => (old > 0 ? old - 1 : old));
  };

  const handleOnIncreaseWeight = () => {
    setWeight((old) => old + 1.25);
  };

  const handleOnDecreaseWeight = () => {
    setWeight((old) => (old > 0 ? old - 1.25 : old - 1));
  };

  return (
    <div>
      <FormNumber
        value={weight}
        onIncrease={handleOnIncreaseWeight}
        onDecrease={handleOnDecreaseWeight}
      />
      <FormNumber
        value={reps}
        onIncrease={handleOnIncreaseReps}
        onDecrease={handleOnDecreaseReps}
      />
    </div>
  );
};

const FormNumber = ({ onIncrease, onDecrease, value }) => {
  return (
    <div className="formNumberWrapper">
      <div className="formNumberButton top" onClick={onIncrease}>
        increase
      </div>
      <div className="formNumberValue">{value}</div>
      <div className="formNumberButton bottom" onClick={onDecrease}>
        decrease
      </div>
    </div>
  );
};
