import api from "../axios";

export const getLearnerIndicatorScores = async () => {
  const response = await api.get("/learner-indicator-scores");
  return response.data;
};

export const getAssessmentResults = async () => {
  const response = await api.get("/assessment-results");
  return response.data;
};

export const getPathwayRecommendations = async () => {
  const response = await api.get("/pathway-recommendations");
  return response.data;
};

export const getCareerDecisionScores = async () => {
  const response = await api.get("/career-decision-scores");
  return response.data;
};

export const getCareerValuePreferences = async () => {
  const response = await api.get("/career-value-preferences");
  return response.data;
};