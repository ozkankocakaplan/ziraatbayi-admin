import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Flex, Form, FormProps, Input, notification } from "antd";
import { getCategory, updateCategory } from "../../services/categoryService";
import { useParams } from "react-router-dom";

import TextArea from "antd/es/input/TextArea";

import { Typography } from "antd";
import UpdateCategoryRequest from "../../payload/request/UpdateCategoryRequest";
import SelectCategory from "../../components/SelectCategory/SelectCategory";
const { Title } = Typography;
type FieldType = {};

export default function EditCategory() {
  const [api, contextHolder] = notification.useNotification();
  const { id } = useParams();
  const [form] = Form.useForm();

  const mutation = useMutation({
    mutationFn: updateCategory,
    onError: (error) => {
      api.error({
        message: "Kategori güncellenirken bir hata oluştu.",
      });
    },
    onSuccess: (data) => {
      api.success({
        message: "Kategori başarıyla güncellendi.",
      });
    },
  });
  useQuery({
    queryFn: async () => {
      if (id) {
        let res = await getCategory(parseInt(id));
        if (res.entity) {
          form.setFieldsValue(res.entity);
        }
        return res;
      }
      return null;
    },
    queryKey: [`category-${id}`],
  });

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const data = {
      ...values,
      id: Number(id),
    } as UpdateCategoryRequest;
    mutation.mutate(data);
  };
  return (
    <>
      {contextHolder}
      <Flex vertical align="center" gap={30}>
        <Title level={2}>Kategori Düzenle</Title>
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
