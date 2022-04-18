import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { QueryClient, QueryClientProvider } from 'react-query'
import { Routes, Route } from 'react-router-dom'

import RewardPage from './components/pages/RewardPage'
import WorkoutPage from './components/pages/WorkoutPage'
import HomePage from './components/pages/HomePage'
import ExercicePage from './components/pages/exercice/ExercicePage'

function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <TopBanner />
      <div className="appContent">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/rewards" element={<RewardPage />} />
          <Route path="/exercices/*" element={<ExercicePage />} />
          <Route path="/workouts/*" element={<WorkoutPage />} />
        </Routes>
      </div>
    </QueryClientProvider>
  )
}

const TopBanner = () => {
  return (
    <div className="appTopBanner">
      <div className="appTopBannerTitle">Home</div>
    </div>
  )
}

export default App
