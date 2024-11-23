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
