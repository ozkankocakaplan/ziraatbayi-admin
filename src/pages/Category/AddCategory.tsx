import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Flex,
  Form,
  FormProps,
  Input,
  notification,
  TreeSelect,
} from "antd";
import { useEffect, useState } from "react";
import {
  addCategory,
  getCategories,
  getCategory,
  updateCategory,
} from "../../services/categoryService";
import { useParams } from "react-router-dom";
import CategoryResponse from "../../payload/response/CategoryResponse";
import { getErrorMessage, rootCategory } from "../../helper/helper";
import TextArea from "antd/es/input/TextArea";

import { Typography } from "antd";
import CreateCategoryRequest from "../../payload/request/CreateCategoryRequest";
import { AxiosError } from "axios";
import ServiceResponse from "../../payload/response/ServiceResponse";
import RootCategoryResponse from "../../payload/response/RootCategoryResponse";
import SelectCategory from "../../components/SelectCategory/SelectCategory";

const { Title } = Typography;
type FieldType = {};
export default function AddCategory() {
  const [api, contextHolder] = notification.useNotification();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const { data: categories, isLoading } = useQuery({
    queryFn: getCategories,
    queryKey: ["categories"],
  });
  const mutation = useMutation({
    mutationFn: addCategory,
    onSuccess: () => {
      api.success({
        message: "Başarılı",
        description: "Kategori başarıyla eklendi.",
      });
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
      form.resetFields();
    },
    onError: (error: AxiosError<ServiceResponse<CategoryResponse>>) => {
      console.log(error);
      api.error({
        message: "Hata",
        description: getErrorMessage(
          error.response?.data.exceptionMessage as []
        ),
      });
    },
  });

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    mutation.mutate(values as CreateCategoryRequest);
  };
  useEffect(() => {
    if (categories) {
      form.setFieldValue("parentCategoryId", 0);
    }
  }, [categories]);
  return (
    <>
      {contextHolder}
      <Flex vertical align="center" gap={30}>
        <Title level={2}>Kategori Ekle</Title>
        <Form
          layout={"vertical"}
          form={form}
          onFinish={onFinish}
          initialValues={{ layout: "vertical" }}
          style={{ maxWidth: 600, width: "100%" }}
          labelCol={{ span: 21 }}
        >
          <Form.Item
            label="Kategori"
            name={"parentCategoryId"}
            rules={[
              {
                required: true,
                message: "Bu alan zorunludur.",
              },
            ]}
          >
            <SelectCategory
              onChange={(value) =>
                form.setFieldsValue({ parentCategoryId: value })
              }
            />
          </Form.Item>
          <Form.Item
            label="Kategori Adı"
            name={"name"}
            rules={[
              {
                required: true,
                message: "Bu alan zorunludur.",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Açıklama" name={"description"}>
            <TextArea
              autoSize={{
                minRows: 3,
                maxRows: 6,
              }}
            />
          </Form.Item>
          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Kaydet
            </Button>
          </Form.Item>
        </Form>
      </Flex>
    </>
  );
}
