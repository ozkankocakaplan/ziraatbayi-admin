import React from "react";

import {
  Button,
  Flex,
  notification,
  Space,
  Switch,
  Table,
  Typography,
} from "antd";

import { useNavigate } from "react-router-dom";
import { EditFilled } from "@ant-design/icons";
import ManufacturerResponse from "../../payload/response/ManufacturerResponse";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getManufacturers,
  updateManufacturerStatus,
} from "../../services/manufacturerService";

const { Title } = Typography;
export default function Manufacturers() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

  const { data, isPending, isFetching } = useQuery({
    queryKey: ["manufacturers"],
    queryFn: getManufacturers,
  });

  const mutation = useMutation({
    mutationFn: updateManufacturerStatus,
    onSuccess: () => {
      api.success({
        message: "Üretici firma başarıyla güncellendi",
      });
      queryClient.invalidateQueries({
        queryKey: ["manufacturers"],
      });
    },
    onError: () => {
      api.error({
        message: "Üretici firma güncellenirken bir hata oluştu",
      });
    },
  });

  return (
    <>
      {contextHolder}
      <Flex justify="space-between" align="center" style={{ marginBottom: 16 }}>
        <Title level={2}>Üretici Firmalar</Title>
        <Button
          onClick={() => {
            navigate("/admin/manufacturers/add");
          }}
          type="primary"
        >
          Yeni Üretici Ekle
        </Button>
      </Flex>
      <Table<ManufacturerResponse>
        loading={isPending || isFetching}
        pagination={{
          defaultPageSize: 50,
          showSizeChanger: true,
          pageSizeOptions: ["50", "100", "200"],
        }}
        columns={[
          {
            title: "Üretici Adı",
            dataIndex: "name",
            key: "name",
          },
          {
            title: "Durum",
            dataIndex: "isActive",
            key: "isActive",
            render: (text, record) => {
              return (
                <Space>
                  <Switch
                    checkedChildren="Aktif"
                    unCheckedChildren="Pasif"
                    onChange={(value) => {
                      mutation.mutate(record.id);
                    }}
                    checked={record.isActive}
                  />
                </Space>
              );
            },
          },
          {
            title: "İşlem",
            dataIndex: "action",
            key: "action",
            width: "30%",
            render: (text, record) => {
              return (
                <span>
                  <Button
                    onClick={() => {
                      navigate(`/admin/manufacturers/edit/${record.id}`);
                    }}
                    type="primary"
                    style={{ marginLeft: 10 }}
                  >
                    <EditFilled />
                  </Button>
                </span>
              );
            },
          },
        ]}
        dataSource={data?.list?.map?.((item) => ({
          ...item,
          key: item.id,
        }))}
      />
    </>
  );
}
