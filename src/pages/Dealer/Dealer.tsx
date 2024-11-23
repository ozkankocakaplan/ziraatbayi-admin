import React, { useMemo, useState } from "react";
import type { NotificationArgsProps, TableColumnsType, TableProps } from "antd";
import { Button, notification, Space, Table, Tag } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import { CopyToClipboard } from "react-copy-to-clipboard";
type OnChange = NonNullable<TableProps<DataType>["onChange"]>;
type Filters = Parameters<OnChange>[1];

type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

interface DataType {
  key: string;
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  glnNumber: string;
  taxNumber: string;
  taxOffice: string;
  address: string;
}

const data: DataType[] = [
  {
    key: "1",
    fullName: "Özkan Kocakaplan",
    companyName: "KOCAKAPLAN",
    email: "example@gmail.com",
    phone: "123456",
    glnNumber: "123456",
    taxNumber: "123456",
    taxOffice: "Antalya",
    address: "Konyaaltı",
  },
];
type NotificationPlacement = NotificationArgsProps["placement"];

const Context = React.createContext({ name: "Default" });

const Dealer: React.FC = () => {
  const [api, contextHolder] = notification.useNotification();

  const [filteredInfo, setFilteredInfo] = useState<Filters>({});
  const [sortedInfo, setSortedInfo] = useState<Sorts>({});

  const handleChange: OnChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter as Sorts);
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: "Ad Soyad",
      dataIndex: "fullName",
      key: "fullName",
      filters: [{ text: "Özkan", value: "Özkan Kocakaplan" }],
      filteredValue: filteredInfo.name || null,
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
      render: (glnNumber) => (
        <Space size="middle">
          <span>{glnNumber}</span>
          <CopyToClipboard
            onCopy={() => {
              api.info({
                message: "Kopyalandı",
                description: `Gln numarası kopyalandı`,
                placement: "topRight",
              });
            }}
            text={glnNumber}
          >
            <CopyOutlined />
          </CopyToClipboard>
        </Space>
      ),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      ellipsis: true,
    },

    {
      title: "Durum",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" danger>
            Sil
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      {contextHolder}
      <Table<DataType>
        loading={false}
        virtual
        scroll={{ x: 1500, y: 300 }}
        columns={columns}
        dataSource={data}
        onChange={handleChange}
      />
    </>
  );
};

export default Dealer;
