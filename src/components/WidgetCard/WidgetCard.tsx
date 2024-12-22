import Icon, { HomeOutlined } from "@ant-design/icons";
import { Skeleton, Typography } from "antd";
import React from "react";
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
  icon?: any;
  antIcon?: any;
  loading?: boolean;
  color?: string;
}
const WidgetCard = ({
  title,
  value,
  icon,
  loading,
  antIcon,
  color,
}: QuickStatsProps) => {
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
        <Title
          style={{ margin: 0, fontWeight: "700", fontSize: 30, color }}
          level={2}
        >
          {value}
        </Title>
      </div>
      {icon && <Icon color="blue" component={icon} />}
      {antIcon && (
        <div
          style={{
            height: 48,
            width: 48,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 8,
            backgroundColor: "#1890ff",
          }}
        >
          {antIcon}
        </div>
      )}
    </div>
  );
};
export default WidgetCard;
