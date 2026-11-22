
import axiosInstance from "./axiosInstance";

export const register = async (studentData) => {
  const response = await axiosInstance.post(
    "/api/register",
    studentData
  );

  return response.data;
};

export const login = async (credentials) => {
  const response = await axiosInstance.post(
    "/api/auth/login",
    credentials
  );

  return response.data;
};

export const getStudents = async () => {
  const response = await axiosInstance.get("/api/students");
  return response.data;
};
