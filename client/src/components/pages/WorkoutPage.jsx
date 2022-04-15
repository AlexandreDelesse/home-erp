import React, { useState, useReducer, useEffect } from "react";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import { IoIosFitness, IoIosStats } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { BiPlus } from "react-icons/bi";

import { Spinner } from "reactstrap";

import DateFormatter from "../formatters/DateFormatter";
import BackButton from "../buttons/BackButton";

import "./workoutPage.css";
import FloatingButton from "../buttons/FloatingButton";
import ClassicButton from "../buttons/ClassicButton";
import CreateActivityForm from "../forms/CreateActivityForm";
import useGetWorkouts from "../../hooks/query/useGetWorkouts";
import useAddWorkout from "../../hooks/mutations/useAddWorkout";
import useDeleteWorkout from "../../hooks/mutations/useDeleteWorkout";
import ButtonBar from "../buttons/ButtonBar";
import useDeleteActivity from "../../hooks/mutations/activity/useDeleteActivity";
import CreateSerieForm from "../forms/CreateSerieForm";

function WorkoutPage(props) {
  // Queries
  const workoutQuery = useGetWorkouts();

  if (workoutQuery.isLoading) {
    return <Spinner />;
  }
  if (workoutQuery.isError) {
    return <div>{workoutQuery.error.message} </div>;
  }

  return (
    <div>
      <BackButton />
      <div className="workoutPageContent">
        <Routes>
          <Route
            path="/"
            element={<WorkoutList workouts={workoutQuery.data} />}
          />
          <Route path=":id" element={<WorkoutDetail />} />
          <Route path=":id/addActivity" element={<CreateActivityForm />} />
        </Routes>
      </div>
    </div>
  );
}

WorkoutPage.propTypes = {};

export default WorkoutPage;

// ----- List -----

const WorkoutList = ({ workouts }) => {
  const navigate = useNavigate();

  const onWorkoutClick = (workout) => {
    navigate(`${workout.id}`, { state: workout });
  };

  const workoutCreateMutation = useAddWorkout();
  const workoutDeleteMutation = useDeleteWorkout();

  const handleOnAddWorkoutClick = async () => {
    workoutCreateMutation.mutate();
  };

  return (
    <div className="workoutOverviewList">
      {workouts.map((workout) => (
        <WorkoutOverview
          key={workout.id}
          workout={workout}
          onClick={onWorkoutClick}
          onDelete={workoutDeleteMutation.mutate}
        />
      ))}
      <FloatingButton
        loading={workoutCreateMutation.isLoading}
        onClick={handleOnAddWorkoutClick}
        className="workoutAddButton"
      >
        <BiPlus size="30px" />
      </FloatingButton>
    </div>
  );
};

// ----- Overview -----

const WorkoutOverview = ({ workout, onClick, onDelete }) => {
  const handleOnDeleteIcon = (e) => {
    e.stopPropagation();
    onDelete(workout.id);
  };

  return (
    <div className="workoutOverview" onClick={() => onClick(workout)}>
      <DateFormatter ISODate={workout.createdAt} />
      <IoClose size="20px" onClick={handleOnDeleteIcon} />
    </div>
  );
};

// ----- Detail -----

const WorkoutDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const workouts = useGetWorkouts();

  if (workouts.isLoading) {
    return <Spinner />;
  }

  if (workouts.isError) {
    return <div>{workouts.error.message} </div>;
  }

  if (workouts.isSuccess && workouts.isFetching) {
    return <Spinner />;
  }

  const workout = workouts.data.find((el) => el.id.toString() === id);

  return workout ? (
    <div>
      <div className="workoutDate">
        <DateFormatter ISODate={workout.date} />
      </div>

      <ClassicButton
        className="mt-4"
        onClick={() => navigate("addActivity", { state: workout })}
      >
        Activité <BiPlus size="17px" />
      </ClassicButton>
      <div>
        {workout.activities ? (
          workout.activities.map((activity) => (
            <Activity key={activity.id} activity={activity} />
          ))
        ) : (
          <div>No activities</div>
        )}
      </div>
    </div>
  ) : (
    <div>404 </div>
  );
};

// ----- Activity -----

const Activity = ({ activity }) => {
  const deleteActivity = useDeleteActivity();
  const navigate = useNavigate();
  const addSerie = () => {};

  return (
    <div className="activityWrapper">
      <div className="activityTitle">
        {activity.exercice.name}
        <ButtonBar
          onAdd={() => {
            console.log("add");
          }}
          onDelete={() => {
            deleteActivity.mutate(activity.id);
          }}
          onEdit={() => {
            console.log("edit");
          }}
        />
      </div>
      <div className="serieList">
        {activity.series.map((serie) => (
          <Serie key={serie.id} serie={serie} />
        ))}
        <SerieForm onChange={addSerie} />
      </div>
    </div>
  );
};

const SerieForm = ({ onChange }) => {
  const [input, setInput] = useState({});
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput((old) => ({ ...old, [name]: value }));
  };

  useEffect(() => {
    onChange(input);
  }, [input]);

  return (
    <div className="serieWrapper">
      <input
        type="number"
        value={input.reps}
        name="reps"
        onChange={handleInputChange}
      />
      <input
        type="number"
        value={input.weight}
        name="weight"
        onChange={handleInputChange}
      />
    </div>
  );
};

// ----- Serie -----

const Serie = ({ serie }) => {
  return (
    <div className="serieWrapper">
      <div>
        <IoIosFitness /> {serie.weight}
      </div>
      <div>
        <IoIosStats /> {serie.reps}
      </div>
    </div>
  );
};
