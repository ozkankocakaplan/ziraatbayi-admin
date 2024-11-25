import { useQuery } from "@tanstack/react-query";
import { Button, Flex, Switch, Table, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../../services/productService";
import ProductResponse from "../../payload/response/ProductResponse";
import { EditFilled } from "@ant-design/icons";
const { Title } = Typography;
export default function Products() {
  const navigate = useNavigate();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  return (
    <>
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
        dataSource={data?.list.map((item) => ({ ...item, key: item.id }))}
        loading={isLoading || isFetching}
        columns={[
          {
            title: "Ürün Adı",
            dataIndex: "name",
            key: "name",
            render: (name) => <span>{name}</span>,
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
                  onChange={(value) => {}}
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
                  navigate(`/admin/products/${record.id}`);
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
