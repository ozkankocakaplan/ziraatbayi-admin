import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Button, Flex, Space, Table, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { EditFilled } from "@ant-design/icons";
import { PlanResponse } from "../../payload/response/PlanResponse";
import { getPlans } from "../../services/planService";

const { Title } = Typography;

interface PlanType extends PlanResponse {
  key: React.ReactNode;
}

export default function Plans() {
  const navigate = useNavigate();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["plans"],
    queryFn: getPlans,
  });

  const extraDataSource = () => {
    let datas = [] as PlanType[];
    data?.list?.map?.((item, index) => {
      datas.push({
        ...item,
        key: index,
      });
    });
    return data ? datas : [];
  };

  return (
    <>
      <Flex justify="space-between" align="center" style={{ marginBottom: 16 }}>
        <Title level={2}>Planlar</Title>
        
      </Flex>
      <Table<PlanType>
        loading={isLoading || isFetching}
        scroll={{ x: 1500 }}
        columns={[
          {
            title: "Plan Adı",
            dataIndex: "planName",
            key: "planName",
          },
          {
            title: "Tür",
            dataIndex: "planType",
            key: "planType",
            render: (planType) => planType === 'MONTHLY' ? "Aylık" : "Yıllık",
          },
          {
            title: "Fiyat",
            dataIndex: "price",
            key: "price",
            render: (_,{price,discountPrice}) =>{
              return <>
                {discountPrice ? (
                  <Typography.Text delete>₺{price.toFixed(2)}</Typography.Text>
                ) : (
                  `₺${price.toFixed(2)}`
                )}
              </>
            }
          },
          {
            title: "İndirimli Fiyat",
            dataIndex: "discountPrice",
            key: "discountPrice",
            render: (price) => (price ? `₺${price.toFixed(2)}` : "-"),
          },
          {
            title: "Deneme Süresi",
            dataIndex: "trialPeriodDays",
            key: "trialPeriodDays",
            render: (days) => (days ? `${days} gün` : "-"),
          },
          {
            title: "İptal Süresi",
            dataIndex: "cancelPeriodDays",
            key: "cancelPeriodDays",
            render: (days) => (days ? `${days} gün` : "-"),
          },
          {
            title: "İşlem",
            key: "action",
            width: "10%",
            render: (_, record) => (
              <Space>
                <Button
                  onClick={() => {
                    navigate(`/admin/plans/edit/${record.id}`);
                  }}
                  type="primary"
                >
                  <EditFilled />
                </Button>
              </Space>
            ),
          },
        ]}
        dataSource={extraDataSource()}
      />
    </>
  );
} 