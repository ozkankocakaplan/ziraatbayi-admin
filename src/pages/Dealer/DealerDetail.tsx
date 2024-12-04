import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Table,
  Switch,
  Row,
  Col,
  Card,
  Image,
  Space,
  Spin,
} from "antd";
import { EditFilled } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { getDealerById } from "../../services/dealerService";
import { useNavigate, useParams } from "react-router-dom";
import { render } from "@testing-library/react";
import dayjs from "dayjs";
import AdvertResponse from "../../payload/response/AdvertResponse";
import ProductImage from "../../components/ProductImage/ProductImage";

const DealerDetail = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const navigation = useNavigate();
  const { data, isPending, isFetching, isError, isSuccess } = useQuery({
    queryFn: () => getDealerById(Number(id)),
    queryKey: ["dealer"],
    retry: 1,
  });

  useEffect(() => {
    if (data?.entity.dealer) {
      form.setFieldsValue(data?.entity.dealer);
    }
  }, [isSuccess]);

  if (isError) {
    navigation("/404");
  }

  const columns = [
    {
      title: "Resim",
      dataIndex: "productImage",
      key: "productImage",
      render: (text: any, record: AdvertResponse) => {
        return (
          <ProductImage
            imageUrl={record?.product.images?.[0]?.imageUrl || "error"}
            productName={record.product.name}
          />
        );
      },
    },
    {
      title: "İlan Numarası",
      dataIndex: "adNumber",
      key: "adNumber",
      render: (text: any, record: AdvertResponse) => {
        return <span>{record.id}</span>;
      },
    },
    {
      title: "Ürün Adı",
      dataIndex: "productName",
      key: "productName",
      render: (text: any, record: AdvertResponse) => {
        return <span>{record.product.name}</span>;
      },
    },
    {
      title: "Kategori Adı",
      dataIndex: "categoryName",
      key: "categoryName",
      render: (text: any, record: AdvertResponse) => {
        return <span>{record.product.categoryName}</span>;
      },
    },

    {
      title: "Üretim Tarihi",
      dataIndex: "startDate",
      key: "startDate",
      render: (text: any, record: any) => {
        return (
          <Space>
            {record.startDate === null ? (
              <span>-</span>
            ) : (
              <span>{dayjs(record.startDate).format("DD.MM.YYYY")}</span>
            )}
          </Space>
        );
      },
    },
    {
      title: "Son Kullanım Tarihi",
      dataIndex: "expiryDate",
      key: "expiryDate",
      render: (text: any, record: any) => {
        return (
          <Space>
            <span>{dayjs(record.expiryDate).format("DD.MM.YYYY")}</span>
          </Space>
        );
      },
    },
    {
      title: "Yayınlanma Tarihi",
      dataIndex: "publishDate",
      key: "publishDate",
    },
    {
      title: "Durum",
      dataIndex: "isActive",
      key: "isActive",
      render: (text: any, record: any) => {
        return (
          <Space>
            <Switch
              checkedChildren="Aktif"
              unCheckedChildren="Pasif"
              onChange={(value) => {}}
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
      render: (text: any, record: any) => {
        return (
          <Button onClick={() => {}} type="primary" style={{ marginLeft: 10 }}>
            <EditFilled />
          </Button>
        );
      },
    },
  ];

  const handleFormSubmit = (values: any) => {
    console.log("Updated Dealer Info:", values);
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#f0f2f5" }}>
      <Spin spinning={isPending || isFetching}>
        <Card
          title="Bayi Bilgileri"
          bordered={true}
          style={{ marginBottom: "20px", background: "#fff" }}
        >
          <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="firstName" label="Ad">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="lastName" label="Soyad">
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="email" label="E-posta">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="phone" label="Telefon">
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="taxNumber" label="Vergi Numarası">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="taxOffice" label="Vergi Dairesi">
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="isActive"
                  label="Aktif Mi?"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="isApproved"
                  label="Onaylı Mı?"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={24}>
                <Form.Item name="address" label="Adres">
                  <Input.TextArea rows={3} />
                </Form.Item>
              </Col>
            </Row>

            <Button type="primary" htmlType="submit">
              Güncelle
            </Button>
          </Form>
        </Card>

        <Card title="İlanlar" bordered={true} style={{ background: "#fff" }}>
          <Table
            loading={isPending || isFetching}
            virtual
            scroll={{ x: 1500, y: 300 }}
            columns={columns}
            dataSource={data?.entity.adverts.map((item: any) => ({
              ...item,
              key: item.id,
            }))}
          />
        </Card>
      </Spin>
    </div>
  );
};

export default DealerDetail;
