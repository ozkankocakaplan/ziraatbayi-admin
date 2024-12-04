import DealerDetailResponse from "../payload/response/DealerDetailResponse";
import DealerResponse from "../payload/response/DealerResponse";
import ServiceResponse from "../payload/response/ServiceResponse";
import apiClient from "./apiClient";

export const getDealers = async (): Promise<
  ServiceResponse<DealerResponse>
> => {
  const response = await apiClient.get<ServiceResponse<DealerResponse>>(
    "/api/dealer/dealers"
  );
  return response.data;
};
export const updateDealerStatus = async (
  id: number
): Promise<ServiceResponse<DealerResponse>> => {
  const response = await apiClient.put<ServiceResponse<DealerResponse>>(
    `/api/dealer/update-dealer-active-status/${id}`
  );
  return response.data;
};
export const dealerApproval = async (
  id: number
): Promise<ServiceResponse<DealerResponse>> => {
  const response = await apiClient.put<ServiceResponse<DealerResponse>>(
    `/api/dealer/dealer-approval/${id}`
  );
  return response.data;
};
export const getDealerById = async (
  id: number
): Promise<ServiceResponse<DealerDetailResponse>> => {
  const response = await apiClient.get<ServiceResponse<DealerDetailResponse>>(
    `/api/dealer/dealer-detail/${id}`
  );
  return response.data;
};
