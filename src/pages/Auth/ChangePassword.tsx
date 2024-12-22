import { Button, Flex, Form, FormProps, Input, notification } from "antd";

import { Typography } from "antd";
import UpdatePasswordRequest from "../../payload/request/UpdatePasswordRequest";
import { useMutation } from "@tanstack/react-query";
import { onError } from "../../helper/helper";
import { changePassword } from "../../services/userService";
const { Title } = Typography;

export default function ChangePassword() {
  const [api, contextHolder] = notification.useNotification();

  const [form] = Form.useForm();

  const handleUpdatePassword = useMutation({
    mutationFn: (values: UpdatePasswordRequest) => {
      return changePassword(values);
    },
    onSuccess: async (data) => {
      if (data.isSuccessful) {
        form.resetFields();
        api.success({
          message: "Şifreniz başarıyla değiştirildi!",
        });
      }
    },
    onError: (error: any) => {
      onError(error, api);
    },
  });

  const onFinish: FormProps<UpdatePasswordRequest>["onFinish"] = (values) => {
    handleUpdatePassword.mutate(values);
  };

  return (
    <>
      {contextHolder}
      <Flex vertical align="center" gap={30}>
        <Title level={2}>Şifre Değiştir</Title>

        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          initialValues={{ layout: "vertical" }}
          style={{ maxWidth: 600, width: "100%" }}
          labelCol={{ span: 21 }}
        >
          <Form.Item
            label="Eski Şifre"
            name="oldPassword"
            rules={[
              {
                required: true,
                message: "Lütfen eski şifrenizi girin!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Yeni Şifre"
            name="newPassword"
            rules={[
              {
                required: true,
                message: "Lütfen şifrenizi girin!",
              },
              {
                validator: async (_, value) => {
                  if (value && value.length < 6) {
                    return Promise.reject(
                      new Error("Şifre en az 6 karakter olmalıdır!")
                    );
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Yeni Şifre Tekrar"
            name="passwordAgain"
            dependencies={["newPassword"]}
            rules={[
              {
                required: true,
                message: "Lütfen şifrenizi tekrar girin!",
              },
              {
                validator: async (_, value) => {
                  if (value !== form.getFieldValue("newPassword")) {
                    return Promise.reject(new Error("Şifreler eşleşmiyor!"));
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input.Password />
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
