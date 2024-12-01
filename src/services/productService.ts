import UpdateProductRequest from "../payload/request/UpdateProductRequest";
import ProductImageResponse from "../payload/response/ProductImageResponse";
import ProductResponse from "../payload/response/ProductResponse";
import ServiceResponse from "../payload/response/ServiceResponse";
import apiClient from "./apiClient";

export const createProduct = async (
  data: FormData
): Promise<ServiceResponse<ProductResponse>> => {
  const response = await apiClient.post<ServiceResponse<ProductResponse>>(
    "/api/product/create-product",
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
    "/api/product/products"
  );
  return response.data;
};
export const getProduct = async (
  id: number
): Promise<ServiceResponse<ProductResponse>> => {
  const response = await apiClient.get<ServiceResponse<ProductResponse>>(
    `/api/product/${id}`
  );
  return response.data;
};
export const getProductImage = async (imageName: string): Promise<Blob> => {
  const response = await apiClient.get(`${imageName}`, {
    responseType: "blob",
  });
  return response.data;
};
export const addProductImage = async (
  data: FormData
): Promise<ServiceResponse<ProductImageResponse>> => {
  const response = await apiClient.post<ServiceResponse<ProductImageResponse>>(
    `/api/product/add-product-image/${data.get("productId")}`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};
export const deleteProductImage = async (
  imageId: number
): Promise<ServiceResponse<ProductImageResponse>> => {
  const response = await apiClient.delete<
    ServiceResponse<ProductImageResponse>
  >(`/api/product/delete-product-image/${imageId}`);
  return response.data;
};
export const updateProductStatus = async (
  id: number
): Promise<ServiceResponse<ProductResponse>> => {
  const response = await apiClient.put<ServiceResponse<ProductResponse>>(
    `/api/product/update-product-status/${id}`
  );
  return response.data;
};
export const updateProduct = async (
  data: UpdateProductRequest
): Promise<ServiceResponse<ProductResponse>> => {
  const response = await apiClient.put<ServiceResponse<ProductResponse>>(
    `/api/product/update-product`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};
