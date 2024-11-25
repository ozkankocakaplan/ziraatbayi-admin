interface CategoryResponse {
  id: number;
  name: string;
  parentCategoryId: number;
  categoryType: string;
  isActive: boolean;
  description: string;
  imageUrl: string;
}
export default CategoryResponse;
