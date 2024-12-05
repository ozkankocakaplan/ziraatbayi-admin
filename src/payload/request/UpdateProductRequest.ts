interface UpdateProductRequest {
  id: number;
  name: string;
  description: string;
  categoryId: number;
  manufacturerId: number;
  activeSubstance: string;
  isActive: boolean;
}
export default UpdateProductRequest;
