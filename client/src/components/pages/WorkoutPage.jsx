import React, { useState } from "react";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  useParams,
} from "react-router-dom";
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

function WorkoutPage(props) {
  // Queries
  const workoutQuery = useGetWorkouts();

  if (workoutQuery.isLoading) {
    console.log("loading");
    return <Spinner />;
  }
  if (workoutQuery.isError) {
    console.log("error");
    return <div>{workoutQuery.error.message} </div>;
  }
  console.log("success");

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

  console.log(workouts);
  if (workouts.isLoading) {
    console.log("loading");
    return <Spinner />;
  }
  if (workouts.isError) {
    console.log("error");
    return <div>{workouts.error.message} </div>;
  }

  if (workouts.isFetching) {
    return <Spinner />;
  }

  console.log("success");
  const workout = workouts.data.find((el) => el.id.toString() === id);

  return (
    <div>
      <div className="workoutDate">
        <DateFormatter ISODate={workout.date} />
      </div>

      <ClassicButton
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
  );
};

// ----- Activity -----

const Activity = ({ activity }) => {
  return (
    <div className="activityWrapper">
      <div className="activityTitle">{activity.exercice.name}</div>
      <div className="serieList">
        {activity.series.map((serie) => (
          <Serie key={serie.id} serie={serie} />
        ))}
      </div>
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
