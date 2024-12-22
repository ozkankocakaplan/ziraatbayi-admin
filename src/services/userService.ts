import UpdatePasswordRequest from "../payload/request/UpdatePasswordRequest";
import UpdateUserRequest from "../payload/request/UpdateUserRequest";
import ServiceResponse from "../payload/response/ServiceResponse";
import UserResponse from "../payload/response/UserResponse";
import apiClient from "./apiClient";

export const forgotPassword = async (
  email: string
): Promise<ServiceResponse<Boolean>> => {
  const response = await apiClient.post(
    `/api/user/forgot-password?email=${email}`
  );
  return response.data;
};
export const verifyToken = async (
  token: string
): Promise<ServiceResponse<Boolean>> => {
  const response = await apiClient.get(`/api/user/verify-token?token=${token}`);
  return response.data;
};
export const resetPassword = async (
  token: string,
  password: string
): Promise<ServiceResponse<Boolean>> => {
  const response = await apiClient.post(
    `/api/user/reset-password?token=${token}&password=${password}`
  );
  return response.data;
};
export const getUserInfo = async (): Promise<ServiceResponse<UserResponse>> => {
  const response = await apiClient.get("/api/user/user-info");
  return response.data;
};
export const changePassword = async (
  data: UpdatePasswordRequest
): Promise<ServiceResponse<Boolean>> => {
  const response = await apiClient.post("/api/user/update-password", data);
  return response.data;
};
export const updateProfile = async (
  user: UpdateUserRequest
): Promise<ServiceResponse<UserResponse>> => {
  const response = await apiClient.post("/api/user/update-user-info", user);
  return response.data;
};
