import { workoutApi } from './api.config'

const createEmptyActivity = async ({ workoutId, activity }) => {
  console.log('workoutId', workoutId)
  console.log('activity', activity)
  try {
    const newWorkout = await workoutApi.post(
      `/workouts/${workoutId}/activity`,
      activity,
    )
    return newWorkout.data
  } catch (err) {
    throw err
  }
}

export { createEmptyActivity }
