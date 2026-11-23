import axiosInstance from "./axiosInstance";

export const getCareerPathways = async (params = {}) => {
  const response = await axiosInstance.get("/career-pathways", {
    params,
  });

  return response.data;
};

export const createCareerPathway = async (data) => {
  const response = await axiosInstance.post("/career-pathways", data);

  return response.data;
};

export const getPathwayIndicatorMappings = async (params = {}) => {
  const response = await axiosInstance.get("/pathway-indicator-mappings", {
    params,
  });

  return response.data;
};

export const createPathwayIndicatorMapping = async (data) => {
  const response = await axiosInstance.post("/pathway-indicator-mappings", data);

  return response.data;
};