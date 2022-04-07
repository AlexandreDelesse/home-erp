import React from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { IoIosFitness, IoIosStats } from "react-icons/io";

import { useQuery } from "react-query";
import { Spinner } from "reactstrap";
import { getWorkouts } from "../../services/workout.service";
import DateFormatter from "../formatters/DateFormatter";
import BackButton from "../buttons/BackButton";

import "./workoutPage.css";

function WorkoutPage(props) {
  // Access the client
  //   const queryClient = useQueryClient();

  // Queries
  const workoutQuery = useQuery("workouts", getWorkouts);

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
        </Routes>
      </div>
    </div>
  );
}

WorkoutPage.propTypes = {};

export default WorkoutPage;

const WorkoutList = ({ workouts }) => {
  const navigate = useNavigate();

  const onWorkoutClick = (workout) => {
    navigate(`${workout.id}`, { state: workout });
  };

  return (
    <div className="workoutOverviewList">
      {workouts.map((workout) => (
        <WorkoutOverview
          key={workout.id}
          workout={workout}
          onClick={onWorkoutClick}
        />
      ))}
    </div>
  );
};

const WorkoutOverview = ({ workout, onClick }) => {
  return (
    <div className="workoutOverview" onClick={() => onClick(workout)}>
      <DateFormatter ISODate={workout.createdAt} />
    </div>
  );
};

const WorkoutDetail = () => {
  const location = useLocation();
  const workout = location.state;

  return (
    <div>
      <div className="workoutDate">
        <DateFormatter ISODate={workout.date} />
      </div>
      <div>
        {workout.activities.map((activity) => (
          <Activity key={activity.id} activity={activity} />
        ))}
      </div>
    </div>
  );
};

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
