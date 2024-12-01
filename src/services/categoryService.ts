import CreateCategoryRequest from "../payload/request/CreateCategoryRequest";
import UpdateCategoryRequest from "../payload/request/UpdateCategoryRequest";
import CategoryResponse from "../payload/response/CategoryResponse";
import RootCategoryResponse from "../payload/response/RootCategoryResponse";
import ServiceResponse from "../payload/response/ServiceResponse";
import apiClient from "./apiClient";

export const getCategories = async (): Promise<
  ServiceResponse<RootCategoryResponse>
> => {
  const response = await apiClient.get<ServiceResponse<RootCategoryResponse>>(
    "/api/category/categories"
  );
  return response.data;
};
export const getCategory = async (
  id: number
): Promise<ServiceResponse<CategoryResponse>> => {
  const response = await apiClient.get<ServiceResponse<CategoryResponse>>(
    `/api/category/${id}`
  );
  return response.data;
};
export const updateCategory = async (
  data: UpdateCategoryRequest
): Promise<ServiceResponse<CategoryResponse>> => {
  const response = await apiClient.put<ServiceResponse<CategoryResponse>>(
    `/api/category/update-category`,
    data
  );
  return response.data;
};
export const addCategory = async (
  data: CreateCategoryRequest
): Promise<ServiceResponse<CategoryResponse>> => {
  const response = await apiClient.post<ServiceResponse<CategoryResponse>>(
    `/api/category/create-category`,
    data
  );
  return response.data;
};
export const updateCategoryStatus = async (
  id: number
): Promise<ServiceResponse<CategoryResponse>> => {
  const response = await apiClient.put<ServiceResponse<CategoryResponse>>(
    `/api/category/update-active-status/${id}`
  );
  return response.data;
};
