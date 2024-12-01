import { FolderOutlined } from "@ant-design/icons";
import { AxiosError } from "axios";
import ServiceResponse from "../payload/response/ServiceResponse";
import CategoryResponse from "../payload/response/CategoryResponse";

export const rootCategory = {
  title: "Ana Kategori",
  value: "0",
  icon: <FolderOutlined />,
};
export const getErrorMessage: (error: string[]) => string = (error) => {
  return error.join("\n");
};
export const onError = <T,>(
  error: AxiosError<ServiceResponse<T>>,
  api: any
) => {
  api.error({
    message: "Hata",
    description:
      getErrorMessage(error.response?.data.exceptionMessage as []) ||
      "Bir hata oluştu.",
  });
};
