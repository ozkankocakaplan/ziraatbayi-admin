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
  notification,
  Popconfirm,
} from "antd";
import { EditFilled, SubnodeOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getDealerById,
  getDealerDetailSummary,
  updateDealer,
} from "../../services/dealerService";
import { useNavigate, useParams } from "react-router-dom";

import dayjs from "dayjs";
import AdvertResponse from "../../payload/response/AdvertResponse";
import ProductImage from "../../components/ProtectedImage/ProtectedImage";
import ProtectedImage from "../../components/ProtectedImage/ProtectedImage";
import DealerResponse from "../../payload/response/DealerResponse";
import { updateAdvertStatus } from "../../services/advertService";
import WidgetCard from "../../components/WidgetCard/WidgetCard";
import adverts from "../../assets/image/adverts";
import products from "../../assets/image/products";
import { onError } from "../../helper/helper";

const DealerDetail = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const navigation = useNavigate();
  const queryClient = useQueryClient();
  const [advertList, setAdverts] = useState<AdvertResponse[]>([]);
  const { data, isPending, isFetching, isError, isSuccess } = useQuery({
    queryFn: () => getDealerById(Number(id)), //dealerId
    queryKey: ["dealer" + id],
    retry: 1,
  });
  const {
    data: dealerSummary,
    isLoading: dealerSummaryLoading,
    isFetching: summaryFetching,
    error: er,
    refetch,
  } = useQuery({
    queryFn: () => getDealerDetailSummary(Number(id)), //dealerId
    queryKey: ["dealerSummary" + id],
    retry: 1,
  });

  useEffect(() => {
    if (data?.entity.dealer) {
      form.setFieldsValue(data?.entity.dealer);
      console.log(data?.entity.dealer);
    }
    if (data?.entity.adverts) {
      setAdverts(data?.entity.adverts);
    }
  }, [isSuccess]);

  if (isError) {
    navigation("/404");
  }
  const updateStatus = useMutation({
    mutationFn: (advertId: number) => {
      return updateAdvertStatus(advertId);
    },
    onSuccess: (data, variables) => {
      if (data?.isSuccessful) {
        var advert = advertList.find((x) => x.id === variables);
        if (advert) {
          advert.isActive = !advert.isActive;
          setAdverts([...advertList]);
        }
        queryClient.invalidateQueries({
          queryKey: ["dealerSummary" + id],
        });
        api.success({
          message: "Başarılı",
          description: "İlan başarıyla güncellendi.",
        });
      } else {
        api.error({
          message: "Hata",
          description: "İlan güncellenirken bir hata oluştu.",
        });
      }
    },
  });

  const updateDealerForAdmin = useMutation({
    mutationFn: (dealer: DealerResponse) => {
      return updateDealer({ ...dealer, id: Number(id) });
    },

    onSuccess: () => {
      if (data?.isSuccessful) {
        api.success({
          message: "Başarılı",
          description: "Bayi başarıyla güncellendi.",
        });
        queryClient.invalidateQueries({
          queryKey: ["dealer" + id],
        });
        queryClient.invalidateQueries({
          queryKey: ["dealerSummary" + id],
        });
      } else {
        api.error({
          message: "Hata",
          description: "Bayi güncellenirken bir hata oluştu.",
        });
      }
    },
    onError: (error: any) => {
      onError(error, api);
    },
  });
  const columns = [
    {
      title: "Resim",
      dataIndex: "productImage",
      key: "productImage",
      render: (text: any, record: AdvertResponse) => {
        return (
          <ProductImage
            imageUrl={record?.product.images?.[0]?.imageUrl || "error"}
            name={record.product.name}
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
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: any, record: any) => {
        return (
          <Space>
            <span>{dayjs(record.createdAt).format("DD.MM.YYYY")}</span>
          </Space>
        );
      },
    },
    {
      title: "Durum",
      dataIndex: "isActive",
      key: "isActive",
      render: (text: any, record: any) => {
        return (
          <Space>
            <Popconfirm
              placement="bottomLeft"
              title="Silmek istediğinize emin misiniz?"
              description="Bu işlem geri alınamaz ve tüm veriler silinecektir."
              onConfirm={() => {
                updateStatus.mutate(record.id);
              }}
              okText="Evet"
              cancelText="Hayır"
            >
              <Switch
                checkedChildren="Aktif"
                unCheckedChildren="Pasif"
                onChange={(value) => {}}
                checked={record.isActive}
              />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
  const handleFormSubmit = (values: any) => {
    updateDealerForAdmin.mutate(values);
  };
  return (
    <div style={{ padding: "20px", backgroundColor: "#f0f2f5" }}>
      {contextHolder}
      <Spin spinning={isPending || isFetching}>
        <Row
          wrap
          gutter={[16, 16]}
          style={{ marginBottom: "20px" }}
          justify="start"
        >
          <Col xs={24} sm={24} md={24}>
            <WidgetCard
              loading={dealerSummaryLoading || summaryFetching}
              title="Abonelik Bilgileri"
              color={dealerSummary?.entity?.subscription?.color}
              value={
                (dealerSummary?.entity?.subscription?.daysRemaining?.toString() ||
                  0) + " Gün"
              }
              antIcon={
                <SubnodeOutlined
                  style={{
                    color: "#fff",
                    fontSize: "24px",
                  }}
                />
              }
            />
          </Col>
          <Col xs={24} sm={12} md={12}>
            <WidgetCard
              loading={dealerSummaryLoading || summaryFetching}
              title="Toplam yayındaki ilan sayısı"
              value={dealerSummary?.entity.totalActiveAdvert.toString()}
              icon={adverts}
            />
          </Col>
          <Col xs={24} sm={12} md={12}>
            <WidgetCard
              loading={dealerSummaryLoading || summaryFetching}
              title="Toplam yayında olmayan ilan sayısı"
              value={dealerSummary?.entity.totalInactiveAdvert.toString()}
              icon={adverts}
            />
          </Col>
        </Row>
        <Card
          title="Bayi Bilgileri"
          bordered={true}
          style={{ marginBottom: "20px", background: "#fff" }}
        >
          <div style={{ marginBottom: "20px" }}>
            <ProtectedImage
              imageUrl={data?.entity.dealer?.companyImage || "error"}
              name={
                data?.entity.dealer.firstName +
                " " +
                data?.entity.dealer.lastName
              }
            />
          </div>
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
                <Form.Item name="gnlNumber" label="GLN Numarası">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="companyName" label="Firma Adı">
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
                  <Switch disabled />
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
            scroll={{ x: 1300 }}
            columns={columns}
            dataSource={advertList.map((item: any) => ({
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
