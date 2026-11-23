import axiosInstance from "./axiosInstance";

export const getAssessmentDimensions = async (params = {}) => {
  const response = await axiosInstance.get("/assessment-dimensions", {
    params,
  });

  return response.data;
};

export const createAssessmentDimension = async (data) => {
  const response = await axiosInstance.post("/assessment-dimensions", data);

  return response.data;
};