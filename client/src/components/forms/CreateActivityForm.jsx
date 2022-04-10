import React, { useState } from "react";
import { Input, Button, Spinner } from "reactstrap";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getAllExercices } from "../../services/exercice.service";
import ClassicButton from "../buttons/ClassicButton";
import { useLocation, useNavigate } from "react-router-dom";
import { createEmptyActivity } from "../../services/activity.service";
import CreateSerieForm from "./CreateSerieForm";
import useCreateActivity from "../../hooks/mutations/activity/useCreateActivity";

export default function CreateActivityForm() {
  const exercicesQuery = useQuery("exercices", getAllExercices);
  const [withSeries, setWithSeries] = useState(false);
  const location = useLocation();

  const workout = location.state;

  const [activity, setActivity] = useState({
    exerciceId: undefined,
    series: [],
  });

  const activityCreateMutation = useCreateActivity();

  const handleOnChangeExerciceId = (e) => {
    const { value } = e.target;
    setActivity((old) => ({ ...old, exerciceId: value }));
  };

  const handleOnSerieChange = (newSerie) => {
    setActivity((old) => ({ ...old, series: [...old.series, newSerie] }));
  };

  const onSubmitForm = () => {
    activityCreateMutation.mutate({ workoutId: workout.id, activity });
  };

  const toggleWithSeries = () => {
    setWithSeries(!withSeries);
  };

  if (exercicesQuery.isLoading) {
    return <Spinner />;
  }
  if (exercicesQuery.isError) {
    return <div>{exercicesQuery.error.message} </div>;
  }
  return (
    <>
      <Input
        type="select"
        name="exerciceId"
        value={activity.exerciceId}
        onChange={handleOnChangeExerciceId}
        placeholder="Condition"
        className="m-2"
      >
        <option value={null}>Select an exercice</option>
        {exercicesQuery.data.map((exercice) => (
          <option key={exercice.id} value={exercice.id}>
            {exercice.name}
          </option>
        ))}
      </Input>
      <Input
        className="m-2"
        type="checkbox"
        checked={withSeries}
        onClick={toggleWithSeries}
      />{" "}
      With series
      {withSeries && (
        <div className="d-flex">
          <CreateSerieForm onAdd={handleOnSerieChange} />
        </div>
      )}
      <div>
        {activity.series.map((serie, index) => (
          <div key={index}>
            {serie.weight} - {serie.reps}
          </div>
        ))}
      </div>
      <ClassicButton className="m-2" onClick={onSubmitForm}>
        Submit
      </ClassicButton>
    </>
  );
}
