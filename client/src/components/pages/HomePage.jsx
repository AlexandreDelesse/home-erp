import React from 'react'
import { useNavigate } from 'react-router-dom'
import './homePage.css'
import Widget from '../cards/widget/Widget'
import CircularProgressBar from '../progressBar/CircularProgressBar'

function HomePage() {
  const navigate = useNavigate()
  return (
    <div className="homePageWrapper">
      <Widget onNavigate={navigate} title="workouts">
        <div style={{ width: 80, height: 80 }}>
          <CircularProgressBar value={12} />
        </div>
      </Widget>
      <Widget onNavigate={navigate} title="rewards">
        Les données de reward a afficher
      </Widget>
      <Widget onNavigate={navigate} title="workouts">
        D'autres données de workout a afficher
      </Widget>
      <Widget onNavigate={navigate} title="exercices">
        La gestion des exercices
      </Widget>
    </div>
  )
}

HomePage.propTypes = {}

export default HomePage
