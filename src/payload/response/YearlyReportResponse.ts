import MonthlyStatisticsResponse from "./MonthlyStatisticsResponse";

interface YearlyReportResponse {
  year: number;
  monthlyStats: MonthlyStatisticsResponse[];
}
export default YearlyReportResponse;
