import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Flex, notification, Switch, Table, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import {
  getProducts,
  updateProductStatus,
} from "../../services/productService";
import ProductResponse from "../../payload/response/ProductResponse";
import { EditFilled } from "@ant-design/icons";
import ProductImage from "../../components/ProtectedImage/ProtectedImage";
import { useState, useEffect } from "react";
const { Title } = Typography;
export default function Products() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 50,
    total: 0,
  });
  const [api, contextHolder] = notification.useNotification();
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["products", pagination.current, pagination.pageSize],
    queryFn: () => getProducts(pagination.current, pagination.pageSize),
  });

  useEffect(() => {
    if (data?.totalPage) {
      setPagination((prev) => ({
        ...prev,
        total: data.totalPage * pagination.pageSize,
      }));
    }
  }, [data?.totalPage, pagination.pageSize]);

  const handleChangeProductStatus = useMutation({
    mutationFn: updateProductStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      api.success({
        message: "Ürün durumu güncellendi",
      });
    },
    onError: (error) => {
      api.error({
        message: "Ürün durumu güncellenirken bir hata oluştu",
      });
    },
  });

  return (
    <>
      {contextHolder}
      <Flex justify="space-between" align="center" style={{ marginBottom: 16 }}>
        <Title level={2}>Ürünler</Title>
        <Button
          onClick={() => {
            navigate("/admin/products/add");
          }}
          type="primary"
        >
          Ürün Ekle
        </Button>
      </Flex>
      <Table<ProductResponse>
        dataSource={data?.list?.map?.((item) => ({ ...item, key: item.id }))}
        loading={isLoading || isFetching}
        scroll={{ x: 1500 }}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          onChange: (page, pageSize) => {
            setPagination((prev) => ({
              ...prev,
              current: page,
              pageSize: pageSize,
            }));
          },
        }}
        columns={[
          {
            title: "Resim",
            dataIndex: "images",
            key: "images",
            render: (_, record) => {
              return (
                <ProductImage
                  imageUrl={record?.images?.[0]?.imageUrl || "error"}
                  name={record.name}
                />
              );
            },
          },
          {
            title: "Ürün Adı",
            dataIndex: "name",
            key: "name",
            render: (name) => <span>{name}</span>,
          },
          {
            title: "Etken Madde",
            dataIndex: "activeSubstance",
            key: "activeSubstance",
            render: (_, record) => <span>{record.activeSubstance}</span>,
          },
          {
            title: "Üretici Firma",
            dataIndex: "manufacturerName",
            key: "manufacturerName",
            render: (_, record) => <span>{record.manufacturer.name}</span>,
          },
          {
            title: "Kategori Adı",
            dataIndex: "categoryName",
            key: "categoryId",
          },
          {
            title: "Durum",
            dataIndex: "isActive",
            key: "isActive",
            render(value, record, index) {
              return (
                <Switch
                  checkedChildren="Aktif"
                  unCheckedChildren="Pasif"
                  loading={handleChangeProductStatus.isPending}
                  onChange={(value) => {
                    handleChangeProductStatus.mutate(record.id);
                  }}
                  checked={record.isActive}
                />
              );
            },
          },
          {
            title: "İşlem",
            key: "action",
            render: (text, record) => (
              <Button
                type="primary"
                onClick={() => {
                  navigate(`/admin/products/edit/${record.id}`);
                }}
              >
                <EditFilled />
              </Button>
            ),
          },
        ]}
      />
    </>
  );
}
