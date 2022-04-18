import { workoutApi } from './api.config'

const getExercices = async () => {
  try {
    const query = await workoutApi.get('/exercices')
    return query.data
  } catch (err) {
    throw err
  }
}

const getExerciceById = async (id) => {
  try {
    const query = await workoutApi.get(`/exercices/${id}`)
    return query.data
  } catch (err) {
    throw err
  }
}

export { getExercices, getExerciceById }
