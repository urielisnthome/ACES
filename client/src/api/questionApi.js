import axiosInstance from "./axiosInstance";

export const getAssessmentQuestions = async (params = {}) => {
  const response = await axiosInstance.get("/assessment-questions", {
    params,
  });

  return response.data;
};

export const createAssessmentQuestion = async (data) => {
  const response = await axiosInstance.post("/assessment-questions", data);

  return response.data;
};

export const getIndicators = async (params = {}) => {
  const response = await axiosInstance.get("/indicators", {
    params,
  });

  return response.data;
};

export const createIndicator = async (data) => {
  const response = await axiosInstance.post("/indicators", data);

  return response.data;
};

export const getQuestionOptions = async (params = {}) => {
  const response = await axiosInstance.get("/question-options", {
    params,
  });

  return response.data;
};

export const createQuestionOption = async (data) => {
  const response = await axiosInstance.post("/question-options", data);

  return response.data;
};

export const getOptionIndicatorScores = async (params = {}) => {
  const response = await axiosInstance.get("/option-indicator-scores", {
    params,
  });

  return response.data;
};

export const createOptionIndicatorScore = async (data) => {
  const response = await axiosInstance.post("/option-indicator-scores", data);

  return response.data;
};