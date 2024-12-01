import { LoginRequest } from "../payload/request/LoginRequest";
import { LoginResponse } from "../payload/response/LoginResponse";
import ServiceResponse from "../payload/response/ServiceResponse";
import apiClient from "./apiClient";

export const login = async (
  data: LoginRequest
): Promise<ServiceResponse<LoginResponse>> => {
  const response = await apiClient.post<ServiceResponse<LoginResponse>>(
    "/api/auth/loginForWeb",
    data
  );
  return response.data;
};
