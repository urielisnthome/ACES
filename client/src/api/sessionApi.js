import axiosInstance from "./axiosInstance";

export const getAssessmentSessions = async (params = {}) => {
  const response = await axiosInstance.get("/assessment-sessions", {
    params,
  });

  return response.data;
};

export const createAssessmentSession = async (data) => {
  const response = await axiosInstance.post("/assessment-sessions", data);

  return response.data;
};