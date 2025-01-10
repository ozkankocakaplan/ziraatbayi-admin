import Icon from "@ant-design/icons";
import { Card, Col, Flex, Row, Skeleton, Typography } from "antd";
import users from "../../assets/image/dealers";
import products from "../../assets/image/products";
import adverts from "../../assets/image/adverts";
import { useQuery } from "@tanstack/react-query";
import { getDashboardStatistics } from "../../services/statisticService";
import WidgetCard from "../../components/WidgetCard/WidgetCard";
import Bar from "../../components/Charts/Bar";
import { getAdvertAndDealerCountForYearly } from "../../services/reportService";

export default function Home() {
  const { data, isPending, isFetching } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: getDashboardStatistics,
  });

  const { data: statistic } = useQuery({
    queryKey: ["advert-dealer-count-yearly"],
    queryFn: () => getAdvertAndDealerCountForYearly(new Date().getFullYear()),
  });
 
  return (
    <>
      <Row wrap gutter={[16, 16]} justify="start">
        <Col xs={24} sm={12} md={8}>
          <WidgetCard
            loading={isPending || isFetching}
            title="Toplam Bayi"
            value={data?.entity?.totalDealerCount?.toString() || "0"}
            icon={users}
          />
        </Col>
        <Col xs={24} sm={12} md={8}>
          <WidgetCard
            loading={isPending || isFetching}
            title="Toplam Ürün"
            value={data?.entity?.totalProductCount?.toString() || "0"}
            icon={products}
          />
        </Col>
        <Col xs={24} sm={12} md={8}>
          <WidgetCard
            loading={isPending || isFetching}
            title="Toplam İlan"
            value={data?.entity?.totalActiveAdvertCount?.toString() || "0"}
            icon={adverts}
          />
        </Col>
      </Row>
      <Col span={24}>
        <Bar 
          dataType="ordinal" 
          title="Aylık Müşteri Kazanımı" 
          data={statistic?.entity.monthlyStats}
        />
        <Bar 
          dataType="ordinal" 
          title="Aylık İlan Ekleme Oranı" 
          data={statistic?.entity.monthlyStats}
        />
      </Col>
    </>
  );
}
