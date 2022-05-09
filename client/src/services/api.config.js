import axios from "axios";

const rewardApi = axios.create({
  baseURL: process.env.API_URL || " http://192.168.1.11:5001/api",
  timeout: 1000,
});

const workoutApi = axios.create({
  // baseURL: process.env.API_URL || " http://86.220.243.67:5002/api",
  baseURL: process.env.API_URL || " http://192.168.1.11:5002/api",
  timeout: 1000,
});

export { rewardApi, workoutApi };
