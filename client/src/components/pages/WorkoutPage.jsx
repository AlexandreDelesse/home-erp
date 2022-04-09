import React, { useState } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { IoIosFitness, IoIosStats } from 'react-icons/io'
import { IoClose } from 'react-icons/io5'
import { BiPlus } from 'react-icons/bi'

import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Modal, Spinner } from 'reactstrap'
import {
  createEmptyWorkout,
  deleteWorkout,
  getWorkouts,
} from '../../services/workout.service'
import DateFormatter from '../formatters/DateFormatter'
import BackButton from '../buttons/BackButton'

import './workoutPage.css'
import FloatingButton from '../buttons/FloatingButton'
import ClassicButton from '../buttons/ClassicButton'
import { createEmptyActivity } from '../../services/activity.service'
import CreateActivityForm from '../forms/CreateActivityForm'

function WorkoutPage(props) {
  // Queries
  const workoutQuery = useQuery('workouts', getWorkouts)

  if (workoutQuery.isLoading) {
    return <Spinner />
  }
  if (workoutQuery.isError) {
    return <div>{workoutQuery.error.message} </div>
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
  )
}

WorkoutPage.propTypes = {}

export default WorkoutPage

const WorkoutList = ({ workouts }) => {
  const navigate = useNavigate()
  // Access the client
  const queryClient = useQueryClient()

  const onWorkoutClick = (workout) => {
    navigate(`${workout.id}`, { state: workout })
  }

  const workoutCreateMutation = useMutation(createEmptyWorkout, {
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries('workouts')
      navigate(`${data.id}`, { state: data })
    },
    onError: (err) => {
      console.log(err)
    },
  })

  const workoutDeleteMutation = useMutation(deleteWorkout, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('workouts')
    },
    onError: (err) => {
      console.log(err)
    },
  })

  const handleOnAddWorkoutClick = async () => {
    workoutCreateMutation.mutate()
  }

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
  )
}

const WorkoutOverview = ({ workout, onClick, onDelete }) => {
  const handleOnDeleteIcon = (e) => {
    e.stopPropagation()
    onDelete(workout.id)
  }

  return (
    <div className="workoutOverview" onClick={() => onClick(workout)}>
      <DateFormatter ISODate={workout.createdAt} />
      <IoClose size="20px" onClick={handleOnDeleteIcon} />
    </div>
  )
}

const WorkoutDetail = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const workout = location.state
  const queryClient = useQueryClient()

  const onAddActivityClick = () => {
    navigate('addActivity', { state: workout })
  }

  console.log(workout)

  return (
    <div>
      <div className="workoutDate">
        <DateFormatter ISODate={workout.date} />
      </div>

      <ClassicButton onClick={onAddActivityClick}>
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
  )
}

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
  )
}

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
  )
}
