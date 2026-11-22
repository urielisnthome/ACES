import api from "../axios";

export const getAssessmentQuestions = async () => {
  const response = await api.get("/assessment-questions");
  return response.data;
};

export const getIndicators = async () => {
  const response = await api.get("/indicators");
  return response.data;
};

export const getQuestionOptions = async () => {
  const response = await api.get("/question-options");
  return response.data;
};