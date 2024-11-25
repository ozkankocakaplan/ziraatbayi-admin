import ProductImageResponse from "./ProductImageResponse";

interface ProductResponse {
  id: number;
  name: string;
  description: string;
  categoryId: number;
  categoryName: string;
  categoryDescription: string;
  isActive: boolean;
  images: ProductImageResponse[];
}
export default ProductResponse;
