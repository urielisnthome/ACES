import api from "../axios";

export const getAssessmentDimensions = async () => {
  const response = await api.get("/assessment-dimensions");
  return response.data;
};