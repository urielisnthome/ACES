import api from "../axios";

export const createAssessmentSession = async (data) => {
  const response = await api.post("/assessment-sessions", data);
  return response.data;
};

export const getAssessmentSessions = async () => {
  const response = await api.get("/assessment-sessions");
  return response.data;
};