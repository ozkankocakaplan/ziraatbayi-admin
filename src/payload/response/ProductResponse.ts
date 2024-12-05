import ManufacturerResponse from "./ManufacturerResponse";
import ProductImageResponse from "./ProductImageResponse";

interface ProductResponse {
  id: number;
  name: string;
  description: string;
  categoryId: number;
  categoryName: string;
  categoryDescription: string;
  isActive: boolean;
  activeSubstance: string;
  manufacturerId: number;
  manufacturer: ManufacturerResponse;
  images: ProductImageResponse[];
}
export default ProductResponse;
