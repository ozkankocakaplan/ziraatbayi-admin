import ServiceResponse from "../payload/response/ServiceResponse";
import apiClient from "./apiClient";

export const updateAdvertStatus = async (
  advertId: number
): Promise<ServiceResponse<Boolean>> => {
  const response = await apiClient.put(
    `/api/advert/update-advert-status-for-admin/${advertId}`
  );
  return response.data;
};
export const deleteAdvert = async (
  advertId: number
): Promise<ServiceResponse<Boolean>> => {
  const response = await apiClient.delete(
    `/api/advert/delete-advert/${advertId}`
  );
  return response.data;
};
