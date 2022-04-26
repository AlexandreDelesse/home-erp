import { workoutApi } from "./api.config";

// const getExercices = async () => {
//   try {
//     const query = await workoutApi.get("/exercices");
//     return query.data;
//   } catch (err) {
//     throw err;
//   }
// };

// const getExerciceById = async (id) => {
//   try {
//     const query = await workoutApi.get(`/exercices/${id}`);
//     return query.data;
//   } catch (err) {
//     throw err;
//   }
// };

// const deleteExerciceById = async (exerciceId) => {
//   try {
//     const exercice = await workoutApi.delete(`/exercices/${exerciceId}`);
//     return exercice.data;
//   } catch (err) {
//     throw err;
//   }
// };

const createSerie = async (serie) => {
  try {
    const query = await workoutApi.post("/series", serie);
    return query.data;
  } catch (err) {
    throw err;
  }
};

export { createSerie };
