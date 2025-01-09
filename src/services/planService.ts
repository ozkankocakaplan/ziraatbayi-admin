import { PlanResponse } from "../payload/response/PlanResponse";
import ServiceResponse from "../payload/response/ServiceResponse";
import apiClient from "./apiClient";
import UpdatePlanPriceRequest from "../payload/request/UpdatePlanPriceRequest";
import { UpdatePlanRequest } from "../payload/request/UpdatePlanRequest";
 
export const getPlans = async () => {
    const response = await apiClient.get<ServiceResponse<PlanResponse>>("/api/plans");
    return response.data;
};

export const getPlanById = async (id: number): Promise<ServiceResponse<PlanResponse>> => {
    const response = await apiClient.get<ServiceResponse<PlanResponse>>(`/api/plans/${id}`);
    return response.data;
};

export const updatePlanPrice = async (request: UpdatePlanPriceRequest): Promise<ServiceResponse<PlanResponse>> => {
    const response = await apiClient.post("/plans/update-price", request);
    return response.data;
};

export const updatePlan = async (request: UpdatePlanRequest): Promise<ServiceResponse<PlanResponse>> => {
    const response = await apiClient.put(`/api/plans/${request.id}`, request);
    return response.data;
};
