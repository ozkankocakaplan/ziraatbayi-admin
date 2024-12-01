import { DashboardStatistics } from "../payload/response/DashboardStatistics";
import ServiceResponse from "../payload/response/ServiceResponse";
import apiClient from "./apiClient";

export const getDashboardStatistics = async (): Promise<
  ServiceResponse<DashboardStatistics>
> => {
  const response = await apiClient.get<ServiceResponse<DashboardStatistics>>(
    "/api/statistics/dashboard-summary"
  );
  return response.data;
};
