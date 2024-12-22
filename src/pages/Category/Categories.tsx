import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import {
  getCategories,
  updateCategoryStatus,
} from "../../services/categoryService";
import {
  Button,
  Flex,
  notification,
  Space,
  Switch,
  Table,
  Typography,
} from "antd";
import RootCategoryResponse from "../../payload/response/RootCategoryResponse";
import { useNavigate } from "react-router-dom";
import { EditFilled } from "@ant-design/icons";
interface CategoryType extends RootCategoryResponse {
  key: React.ReactNode;
}

const { Title } = Typography;
export default function Categories() {
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const queryClient = useQueryClient();
  const { data, isLoading, isFetching } = useQuery({
    queryFn: getCategories,
    queryKey: ["categories"],
  });

  const extraDataSource = () => {
    let datas = [] as CategoryType[];
    data?.list.map((item, index) => {
      let object = {
        id: item.id,
        name: item.name,
        isActive: item.isActive,
        key: index,
      } as CategoryType;
      if (item?.children?.length > 0) {
        object.children = recursive(item.children, index);
      }
      datas.push(object);
    });

    return data ? datas : [];
  };
  const recursive = (data: RootCategoryResponse[], i: number) => {
    let datas = [] as CategoryType[];
    data?.map?.((item, index) => {
      let object = {
        id: item.id,
        name: item.name,
        isActive: item.isActive,
        key: `${i}-${index}-${item.id}`,
      } as CategoryType;
      if (item?.children?.length > 0) {
        object.children = recursive(item.children, index);
      }
      datas.push(object);
    });
    return datas;
  };
  const { mutate, isPending } = useMutation({
    mutationFn: (id: number) => updateCategoryStatus(id),
    onSuccess: (res) => {
      api.success({
        message: "Kategori durumu güncellendi",
      });
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
    onError: (error) => {
      api.error({
        message: "Kategori durumu güncellenirken bir hata oluştu",
      });
    },
  });

  return (
    <>
      {contextHolder}
      <Flex justify="space-between" align="center" style={{ marginBottom: 16 }}>
        <Title level={2}>Kategoriler</Title>
        <Button
          onClick={() => {
            navigate("/admin/categories/add");
          }}
          type="primary"
        >
          Kategori Ekle
        </Button>
      </Flex>
      <Table<CategoryType>
        loading={isLoading || isFetching}
        columns={[
          {
            title: "Kategori Adı",
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
                  {(!record.children ||
                    record?.children?.filter((x) => !x.isActive).length >
                      0) && (
                    <Switch
                      loading={isPending}
                      checkedChildren="Aktif"
                      unCheckedChildren="Pasif"
                      onChange={(value) => {
                        mutate(record.id);
                      }}
                      checked={record.isActive}
                    />
                  )}
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
                      navigate(`/admin/categories/edit/${record.id}`);
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
        dataSource={extraDataSource()}
      />
    </>
  );
}
