interface CreateCategoryRequest {
  id: number;
  name: string;
  description: string;
  parentCategoryId: number;
}
export default CreateCategoryRequest;
