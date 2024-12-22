import DealerResponse from "./DealerResponse";
import ProductResponse from "./ProductResponse";

interface AdvertResponse {
  id: number;
  product: ProductResponse;
  dealer: DealerResponse;
  stockQuantity: number;
  price: number;
  startDate: string;
  expiryDate: string;
  isActive: boolean;
  createdAt: string;
}
export default AdvertResponse;
