import axiosInstance from "./axiosInstance";

export const getAssessmentResponses = async (params = {}) => {
  const response = await axiosInstance.get("/assessment-responses", {
    params,
  });

  return response.data;
};

export const submitAssessmentResponse = async (data) => {
  const response = await axiosInstance.post("/assessment-responses", data);

  return response.data;
};