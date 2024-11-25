import SettingRequest from "../payload/request/SettingRequest";
import ServiceResponse from "../payload/response/ServiceResponse";
import SettingResponse from "../payload/response/SettingResponse";
import apiClient from "./apiClient";

export const getSetting = async (): Promise<
  ServiceResponse<SettingResponse>
> => {
  const response = await apiClient.get<ServiceResponse<SettingResponse>>(
    "/setting"
  );
  return response.data;
};
export const updateSetting = async (
  data: SettingRequest
): Promise<ServiceResponse<SettingResponse>> => {
  const response = await apiClient.put<ServiceResponse<SettingResponse>>(
    "/setting",
    data
  );
  return response.data;
};
