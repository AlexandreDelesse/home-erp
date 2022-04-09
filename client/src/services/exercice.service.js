import { workoutApi } from './api.config'

const getAllExercices = async () => {
  try {
    const query = await workoutApi.get('/exercices')
    return query.data
  } catch (err) {
    throw err
  }
}

export { getAllExercices }
