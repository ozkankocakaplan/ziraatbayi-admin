import DealerDetailResponse from "../payload/response/DealerDetailResponse";
import DealerDetailSummary from "../payload/response/DealerDetailSummary";
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
export const updateDealer = async (
  dealer: DealerResponse
): Promise<ServiceResponse<DealerDetailResponse>> => {
  const response = await apiClient.put<ServiceResponse<DealerDetailResponse>>(
    `/api/dealer/update-for-admin/${dealer.id}`,
    dealer
  );
  return response.data;
};
export const getDealerDetailSummary = async (
  id: number
): Promise<ServiceResponse<DealerDetailSummary>> => {
  const response = await apiClient.get<ServiceResponse<DealerDetailSummary>>(
    `/api/dealer/dealer-detail-summary/${id}`
  );
  return response.data;
};
