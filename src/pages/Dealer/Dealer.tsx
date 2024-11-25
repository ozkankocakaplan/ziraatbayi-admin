import React, { useMemo, useState } from "react";
import type { NotificationArgsProps, TableColumnsType, TableProps } from "antd";
import {
  Button,
  Flex,
  notification,
  Popconfirm,
  Space,
  Switch,
  Table,
  Tag,
  Typography,
} from "antd";
import { CopyOutlined, DeleteFilled, EyeFilled } from "@ant-design/icons";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getDealers, updateDealerStatus } from "../../services/dealerService";
import DealerResponse from "../../payload/response/DealerResponse";
type OnChange = NonNullable<TableProps<DataType>["onChange"]>;
type Filters = Parameters<OnChange>[1];

type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

interface DataType extends DealerResponse {}
const { Title } = Typography;
const Dealer: React.FC = () => {
  const queryClient = useQueryClient();
  const [api, contextHolder] = notification.useNotification();
  const {
    data: dealers,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["dealers"],
    queryFn: getDealers,
  });

  const [filteredInfo, setFilteredInfo] = useState<Filters>({});
  const [sortedInfo, setSortedInfo] = useState<Sorts>({});

  const handleChange: OnChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter as Sorts);
  };
  const { mutate } = useMutation({
    mutationFn: (id: number) => updateDealerStatus(id),
    onSuccess: (res) => {
      api.success({
        message: "Başarılı",
        description: `Bayi durumu güncellendi`,
        placement: "topRight",
      });
      queryClient.invalidateQueries({
        queryKey: ["dealers"],
      });
    },
    onError(error, variables, context) {
      api.error({
        message: "Hata",
        description: `Bir hata oluştu`,
        placement: "topRight",
      });
    },
  });
  const columns: TableColumnsType<DataType> = [
    {
      title: "Ad Soyad",
      dataIndex: "fullName",
      key: "fullName",
      filters: dealers?.list?.map((dealer) => ({
        text: dealer.fullName,
        value: dealer.fullName,
      })),
      filteredValue: filteredInfo.fullName || null,
      onFilter: (value, record) => record.fullName.includes(value as string),
      sorter: (a, b) => a.fullName.length - b.fullName.length,
      sortOrder: sortedInfo.columnKey === "fullName" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Firma Adı",
      dataIndex: "companyName",
      key: "companyName",
      ellipsis: true,
    },
    {
      title: "E-mail",
      dataIndex: "email",
      key: "email",
      ellipsis: true,
    },
    {
      title: "Telefon",
      dataIndex: "phone",
      key: "phone",
      ellipsis: true,
    },
    {
      title: "GLN Numarası",
      dataIndex: "glnNumber",
      key: "glnNumber",
      ellipsis: true,
      render: (r, record) => (
        <Space key={record.id} size="middle">
          <span>{record.gnlNumber}</span>
          <CopyToClipboard
            onCopy={() => {
              api.info({
                message: "Kopyalandı",
                description: `Gln numarası kopyalandı`,
                placement: "topRight",
              });
            }}
            text={record.gnlNumber}
          >
            <CopyOutlined />
          </CopyToClipboard>
        </Space>
      ),
    },
    {
      title: "Durum",
      dataIndex: "isActive",
      key: "isActive",
      render: (text, record) => {
        return (
          <Space key={record.id}>
            <Switch
              checkedChildren="Aktif"
              unCheckedChildren="Pasif"
              onChange={(value) => {
                mutate(record.id);
              }}
              checked={record.isActive}
            />
          </Space>
        );
      },
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      ellipsis: true,
    },

    {
      title: "İşlem",
      key: "action",
      render: (_, record) => (
        <Space key={record.id} size="middle">
          <Popconfirm
            placement="bottomLeft"
            title="Silmek istediğinize emin misiniz?"
            description="Bu işlem geri alınamaz ve tüm veriler silinecektir."
            onConfirm={() => {}}
            okText="Evet"
            cancelText="Hayır"
          >
            <Button type="primary" danger>
              <DeleteFilled />
            </Button>
          </Popconfirm>
          <Button type="primary">
            <EyeFilled />
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      {contextHolder}
      <Flex justify="space-between" align="center" style={{ marginBottom: 16 }}>
        <Title level={2}>Bayiler</Title>
      </Flex>
      <Table<DataType>
        loading={isLoading || isFetching}
        virtual
        scroll={{ x: 1500, y: 300 }}
        columns={columns}
        dataSource={
          dealers?.list?.map((dealer) => ({ ...dealer, key: dealer.id })) || []
        }
        onChange={handleChange}
      />
    </>
  );
};

export default Dealer;
