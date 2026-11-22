import api from "../axios";

export const getCareerInterventions = async () => {
  const response = await api.get("/career-interventions");
  return response.data;
};

export const getRoadmapSteps = async () => {
  const response = await api.get("/roadmap-steps");
  return response.data;
};