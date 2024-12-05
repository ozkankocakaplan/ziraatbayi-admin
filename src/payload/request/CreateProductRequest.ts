interface CreateProductRequest {
  name: string;
  description: string;
  categoryId: number;
  manufacturerId: number;
  activeSubstance: string;
}
export default CreateProductRequest;
