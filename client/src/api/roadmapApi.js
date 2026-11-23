import axiosInstance from "./axiosInstance";

export const getCareerInterventions = async (params = {}) => {
  const response = await axiosInstance.get("/career-interventions", {
    params,
  });

  return response.data;
};

export const createCareerIntervention = async (data) => {
  const response = await axiosInstance.post("/career-interventions", data);

  return response.data;
};

export const getRoadmapSteps = async (params = {}) => {
  const response = await axiosInstance.get("/roadmap-steps", {
    params,
  });

  return response.data;
};

export const createRoadmapStep = async (data) => {
  const response = await axiosInstance.post("/roadmap-steps", data);

  return response.data;
};