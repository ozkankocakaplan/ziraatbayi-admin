import CreateManufacturerRequest from "../payload/request/CreateManufacturerRequest";
import UpdateManufacturerRequest from "../payload/request/UpdateManufacturerRequest";
import ManufacturerResponse from "../payload/response/ManufacturerResponse";
import ServiceResponse from "../payload/response/ServiceResponse";
import apiClient from "./apiClient";

export const getManufacturers = async (): Promise<
  ServiceResponse<ManufacturerResponse>
> => {
  const response = await apiClient.get<ServiceResponse<ManufacturerResponse>>(
    "/api/manufacturer/manufacturers"
  );
  return response.data;
};
export const getManufacturer = async (
  id: number
): Promise<ServiceResponse<ManufacturerResponse>> => {
  const response = await apiClient.get<ServiceResponse<ManufacturerResponse>>(
    `/api/manufacturer/${id}`
  );
  return response.data;
};
export const createManufacturer = async (
  data: CreateManufacturerRequest
): Promise<ServiceResponse<ManufacturerResponse>> => {
  const response = await apiClient.post<ServiceResponse<ManufacturerResponse>>(
    "/api/manufacturer/create-manufacturer",
    data
  );
  return response.data;
};
export const updateManufacturer = async (
  data: UpdateManufacturerRequest
): Promise<ServiceResponse<ManufacturerResponse>> => {
  const response = await apiClient.put<ServiceResponse<ManufacturerResponse>>(
    `/api/manufacturer/update-manufacturer`,
    data
  );
  return response.data;
};
export const updateManufacturerStatus = async (
  id: number
): Promise<ServiceResponse<ManufacturerResponse>> => {
  const response = await apiClient.put<ServiceResponse<ManufacturerResponse>>(
    `/api/manufacturer/update-manufacturer-status/${id}`
  );
  return response.data;
};
