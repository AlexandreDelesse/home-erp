import { useContext, useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { QueryClient, QueryClientProvider } from "react-query";
import { Routes, Route } from "react-router-dom";

import RewardPage from "./components/pages/RewardPage";
import WorkoutPage from "./components/pages/WorkoutPage";
import HomePage from "./components/pages/HomePage";
import ExercicePage from "./components/pages/exercice/ExercicePage";
import Login from "./components/pages/login/Login";
import { getUserSession, isUser } from "./services/user.service";
import CircularProgressBar from "./components/progressBar/circularProgressBar/CircularProgressBar";
import UserContext from "./contexts/User.context";
import TextPicture from "./components/cards/textPicture/TextPicture";
import TrainingPage from "./components/pages/trainings/TrainingPage";

function App() {
  const queryClient = new QueryClient();
  const [user, setUser] = useState(isUser());

  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider value={{ user, setUser }}>
        <TopBanner />
        <div className="appContent">
          <Routes>
            {user ? (
              <>
                <Route
                  path="/circular"
                  element={<CircularProgressBar value={65} />}
                />
                <Route path="/" element={<HomePage />} />
                <Route path="/rewards" element={<RewardPage />} />
                <Route path="/exercices/*" element={<ExercicePage />} />
                <Route path="/workouts/*" element={<WorkoutPage />} />
                <Route path="/trainings/*" element={<TrainingPage />} />
              </>
            ) : (
              <Route path="*" element={<Login />} />
            )}

            {/* <Route path="*" element={<Login />} /> */}
          </Routes>
        </div>
      </UserContext.Provider>
    </QueryClientProvider>
  );
}

const TopBanner = () => {
  const { user } = useContext(UserContext);
  return (
    <div className="appTopBanner">
      <div className="appTopBannerTitle">Home</div>
      <TextPicture text={user.name} />
    </div>
  );
};

export default App;
