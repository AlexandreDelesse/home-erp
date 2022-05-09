import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./homePage.css";
import Widget from "../cards/widget/Widget";
import { getUserSession } from "../../services/user.service";
import CircularProgressBar from "../progressBar/circularProgressBar/CircularProgressBar";

function HomePage() {
  const navigate = useNavigate();
  const user = getUserSession();

  return (
    <div className="homePageWrapper">
      <Widget onNavigate={navigate} title="workouts">
        <CircularProgressBar value={80} />
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
      <Widget onNavigate={navigate} title="trainings">
        Trainings
      </Widget>
    </div>
  );
}

HomePage.propTypes = {};

export default HomePage;
