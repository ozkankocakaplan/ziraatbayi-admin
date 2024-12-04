import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Button,
  Flex,
  Form,
  FormProps,
  Input,
  notification,
  Switch,
} from "antd";
import { getCategory, updateCategory } from "../../services/categoryService";
import { useParams } from "react-router-dom";

import TextArea from "antd/es/input/TextArea";

import { Typography } from "antd";
import UpdateCategoryRequest from "../../payload/request/UpdateCategoryRequest";
import SelectCategory from "../../components/SelectCategory/SelectCategory";
import {
  getManufacturer,
  updateManufacturer,
} from "../../services/manufacturerService";
import UpdateManufacturerRequest from "../../payload/request/UpdateManufacturerRequest";
const { Title } = Typography;

export default function EditManufacturer() {
  const [api, contextHolder] = notification.useNotification();
  const { id } = useParams();
  const [form] = Form.useForm();

  const mutation = useMutation({
    mutationFn: updateManufacturer,
    onError: (error) => {
      api.error({
        message: "Üretici firma güncellenirken bir hata oluştu.",
      });
    },
    onSuccess: (data) => {
      api.success({
        message: "Üretici firma başarıyla güncellendi.",
      });
    },
  });
  useQuery({
    queryFn: async () => {
      if (id) {
        let res = await getManufacturer(parseInt(id));
        if (res.entity) {
          form.setFieldsValue(res.entity);
        }
        return res;
      }
      return null;
    },
    queryKey: [`manufacturer-${id}`],
  });

  const onFinish: FormProps<UpdateManufacturerRequest>["onFinish"] = (
    values
  ) => {
    const data = {
      ...values,
      id: Number(id),
    } as UpdateManufacturerRequest;
    mutation.mutate(data);
  };
  return (
    <>
      {contextHolder}
      <Flex vertical align="center" gap={30}>
        <Title level={2}>Üretici Firma Düzenle</Title>
        <Form
          layout={"vertical"}
          form={form}
          onFinish={onFinish}
          initialValues={{ layout: "vertical" }}
          style={{ maxWidth: 600, width: "100%" }}
          labelCol={{ span: 21 }}
        >
          <Form.Item
            label="Üretici Firma Adı"
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
          <Form.Item label="Durum" name={"isActive"}>
            <Switch defaultChecked={false} />
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
