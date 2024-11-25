import ProductResponse from "../payload/response/ProductResponse";
import ServiceResponse from "../payload/response/ServiceResponse";
import apiClient from "./apiClient";

export const createProduct = async (
  data: FormData
): Promise<ServiceResponse<ProductResponse>> => {
  const response = await apiClient.post<ServiceResponse<ProductResponse>>(
    "/product/create-product",
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};
export const getProducts = async (): Promise<
  ServiceResponse<ProductResponse>
> => {
  const response = await apiClient.get<ServiceResponse<ProductResponse>>(
    "/product/products"
  );
  return response.data;
};
