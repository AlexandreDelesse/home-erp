import React from 'react'
import { Routes, Route, useNavigate, useParams } from 'react-router-dom'

import BackButton from '../../buttons/BackButton'

import useGetExercices from '../../../hooks/query/useGetExercices'
import useGetExerciceById from '../../../hooks/query/useGetExerciceById'

export default function ExercicePage() {
  return (
    <div>
      <BackButton />
      <div className="workoutPageContent">
        <Routes>
          <Route path="/" element={<ExerciceList />} />
          <Route path=":id" element={<ExerciceDetail />} />
        </Routes>
      </div>
    </div>
  )
}

const ExerciceList = () => {
  const exercices = useGetExercices()
  const navigate = useNavigate()

  const onExerciceClick = (id) => {
    navigate(`${id}`)
  }
  if (exercices.isLoading) return <>Loading</>
  if (exercices.isError) return <>Error: {exercices.error.message}</>
  return (
    <div>
      {exercices.data.map((exercice) => (
        <ExerciceShort
          title={exercice.name}
          id={exercice.id}
          onClick={onExerciceClick}
          key={exercice.id}
        />
      ))}
    </div>
  )
}

const ExerciceShort = ({ id, title, onClick }) => {
  const handleOnClick = () => {
    onClick(id)
  }
  return <div onClick={handleOnClick}>{title} </div>
}

const ExerciceDetail = () => {
  const { id } = useParams()
  const exercice = useGetExerciceById(id)

  if (exercice.isLoading) return <>Loading</>
  if (exercice.isError) return <>Error</>

  return (
    <div>
      <div>{exercice.data.name}</div>
      <div>{exercice.data.type || 'no type'} </div>
      <div>{exercice.data.category || 'no category'} </div>
    </div>
  )
}
