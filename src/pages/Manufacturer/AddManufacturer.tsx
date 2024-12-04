import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Flex, Form, FormProps, Input, notification } from "antd";

import CategoryResponse from "../../payload/response/CategoryResponse";
import { getErrorMessage } from "../../helper/helper";

import { Typography } from "antd";
import { AxiosError } from "axios";
import ServiceResponse from "../../payload/response/ServiceResponse";
import { createManufacturer } from "../../services/manufacturerService";
import CreateManufacturerRequest from "../../payload/request/CreateManufacturerRequest";

const { Title } = Typography;

export default function AddManufacturer() {
  const [api, contextHolder] = notification.useNotification();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const mutation = useMutation({
    mutationFn: createManufacturer,
    onSuccess: () => {
      api.success({
        message: "Başarılı",
        description: "Üretici firma başarıyla eklendi.",
      });
      queryClient.invalidateQueries({
        queryKey: ["manufacturers"],
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

  const onFinish: FormProps<CreateManufacturerRequest>["onFinish"] = (
    values
  ) => {
    mutation.mutate(values);
  };

  return (
    <>
      {contextHolder}
      <Flex vertical align="center" gap={30}>
        <Title level={2}>Üretici Firma Ekle</Title>
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
