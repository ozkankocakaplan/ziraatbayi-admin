import UpdatePlanPriceRequest from "../payload/request/UpdatePlanPriceRequest";
import PlanPriceResponse from "../payload/response/PlanPriceResponse";
import ServiceResponse from "../payload/response/ServiceResponse";
import apiClient from "./apiClient";

export const getPlanPriceList = async (): Promise<
  ServiceResponse<PlanPriceResponse>
> => {
  var response = await apiClient.get("/api/plan/price-list");
  return response.data;
};
export const updatePlanPrice = async (
  request: UpdatePlanPriceRequest
): Promise<ServiceResponse<PlanPriceResponse>> => {
  var response = await apiClient.post("/api/plan/update-plan-price", request);
  return response.data;
};
