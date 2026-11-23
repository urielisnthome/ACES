import axiosInstance from "./axiosInstance";

export const getLearnerIndicatorScores = async (params = {}) => {
  const response = await axiosInstance.get("/learner-indicator-scores", {
    params,
  });

  return response.data;
};

export const createLearnerIndicatorScore = async (data) => {
  const response = await axiosInstance.post("/learner-indicator-scores", data);

  return response.data;
};

export const getAssessmentResults = async (params = {}) => {
  const response = await axiosInstance.get("/assessment-results", {
    params,
  });

  return response.data;
};

export const createAssessmentResult = async (data) => {
  const response = await axiosInstance.post("/assessment-results", data);

  return response.data;
};

export const getPathwayRecommendations = async (params = {}) => {
  const response = await axiosInstance.get("/pathway-recommendations", {
    params,
  });

  return response.data;
};

export const createPathwayRecommendation = async (data) => {
  const response = await axiosInstance.post("/pathway-recommendations", data);

  return response.data;
};

export const getCareerDecisionScores = async (params = {}) => {
  const response = await axiosInstance.get("/career-decision-scores", {
    params,
  });

  return response.data;
};

export const createCareerDecisionScore = async (data) => {
  const response = await axiosInstance.post("/career-decision-scores", data);

  return response.data;
};

export const getCareerValuePreferences = async (params = {}) => {
  const response = await axiosInstance.get("/career-value-preferences", {
    params,
  });

  return response.data;
};

export const createCareerValuePreference = async (data) => {
  const response = await axiosInstance.post("/career-value-preferences", data);

  return response.data;
};