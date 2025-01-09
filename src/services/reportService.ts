import ServiceResponse from "../payload/response/ServiceResponse";
import YearlyReportResponse from "../payload/response/YearlyReportResponse";
import apiClient from "./apiClient";

export const getAdvertAndDealerCountForYearly = async (year: number):Promise<ServiceResponse<YearlyReportResponse>> => {
  const response = await apiClient.get(`/api/reports/statistics/${year}`);
  return response.data;
};
