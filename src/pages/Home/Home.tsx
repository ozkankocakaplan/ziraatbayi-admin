import Icon from "@ant-design/icons";
import { Card, Flex, Skeleton, Typography } from "antd";
import users from "../../assets/image/dealers";
import products from "../../assets/image/products";
import adverts from "../../assets/image/adverts";
import { useQuery } from "@tanstack/react-query";
import { getDashboardStatistics } from "../../services/statisticService";
const cardStyle = {
  flex: 1,
  backgroundColor: "white",
  padding: 15,
  borderRadius: 8,
  boxShadow: "5px 8px 24px 5px rgba(0,0,0,0.1)",
  border: "1px solid #f0f0f0",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};
const titleStyle = {
  color: "#8c8c8c",
  fontSize: 14,
  fontWeight: 900,
};
const { Title } = Typography;
interface QuickStatsProps {
  title: string;
  value?: string;
  icon: any;
  loading?: boolean;
}
const QuickStats = ({ title, value, icon, loading }: QuickStatsProps) => {
  if (loading) {
    return (
      <div style={cardStyle}>
        <div style={{ gap: 5, display: "flex", flexDirection: "column" }}>
          <Skeleton.Input active size={"small"} />
          <Skeleton.Input active size={"small"} style={{ width: 160 }} />
        </div>
        <Skeleton.Avatar
          active
          size={"large"}
          shape={"square"}
          style={{ borderRadius: 8, height: 50, width: 50 }}
        />
      </div>
    );
  }

  return (
    <div style={cardStyle}>
      <div style={{ gap: 5, display: "flex", flexDirection: "column" }}>
        <span style={titleStyle}>{title}</span>
        <Title style={{ margin: 0, fontWeight: "700", fontSize: 30 }} level={2}>
          {value}
        </Title>
      </div>
      <Icon color="blue" component={icon} />
    </div>
  );
};

export default function Home() {
  const { data, isPending, isFetching } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: getDashboardStatistics,
  });

  return (
    <>
      <Flex gap="middle" align="start">
        <QuickStats
          loading={isPending || isFetching}
          title="Toplam Bayi"
          value={data?.entity?.totalDealerCount?.toString() || "0"}
          icon={users}
        />
        <QuickStats
          loading={isPending || isFetching}
          title="Toplam Ürün"
          value={data?.entity?.totalProductCount?.toString() || "0"}
          icon={products}
        />
        <QuickStats
          loading={isPending || isFetching}
          title="Toplam İlan"
          value={data?.entity?.totalActiveAdvertCount?.toString() || "0"}
          icon={adverts}
        />
      </Flex>
    </>
  );
}
