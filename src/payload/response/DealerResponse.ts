interface DealerResponse {
  id: number;
  dealerId: number;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  gnlNumber: string;
  taxNumber: string;
  taxOffice: string;
  isActive: boolean;
  isApproved: boolean;
  address: string;
}
export default DealerResponse;
