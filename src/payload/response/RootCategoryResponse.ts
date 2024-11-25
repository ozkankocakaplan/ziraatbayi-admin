import CategoryResponse from "./CategoryResponse";

interface RootCategoryResponse extends CategoryResponse {
  children: RootCategoryResponse[];
}
export default RootCategoryResponse;
