import AdvertResponse from "./AdvertResponse";
import DealerResponse from "./DealerResponse";

interface DealerDetailResponse {
  dealer: DealerResponse;
  adverts: AdvertResponse[];
}
export default DealerDetailResponse;
