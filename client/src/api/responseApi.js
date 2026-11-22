import api from "../axios";

export const submitAssessmentResponse = async (data) => {
  const response = await api.post("/assessment-responses", data);
  return response.data;
};

export const getAssessmentResponses = async () => {
  const response = await api.get("/assessment-responses");
  return response.data;
};