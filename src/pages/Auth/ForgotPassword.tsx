import React from "react";
import type { FormProps } from "antd";
import {
  Button,
  Col,
  Flex,
  Form,
  Input,
  notification,
  Row,
  Space,
  Typography,
} from "antd";

import { useNavigate } from "react-router-dom";

import Logo from "../../components/Logo/Logo";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "../../services/userService";
import { onError } from "../../helper/helper";

type FieldType = {
  email?: string;
};
const { Title } = Typography;
const ForgotPassword: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

  const resetPassword = useMutation({
    mutationFn: async (email: string) => {
      return forgotPassword(email);
    },
    onError: (er: any) => {
      onError(er, api);
    },
    onSuccess: (res) => {
      if (res.isSuccessful) {
        api.success({
          message: "Başarılı",
          description: `Şifre sıfırlama bağlantısı e-mail adresinize gönderildi.`,
          placement: "topRight",
        });
      } else {
        api.error({
          message: "Hata",
          description: String(res.exceptionMessage) || "Bir hata oluştu.",
          placement: "topRight",
        });
      }
      form.resetFields();
    },
  });

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    if (values.email) {
      resetPassword.mutate(values.email);
    }
  };

  return (
    <Flex
      style={{
        height: "100vh",
        background: "#f9f9f9",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {contextHolder}
      <Row
        gutter={[16, 16]}
        style={{
          margin: 20,
          background: "#fff",
          padding: 20,
          borderRadius: 10,
          maxWidth: 900,
          minHeight: 450,
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          alignItems: "center",
        }}
      >
        <Col
          xs={24}
          sm={24}
          md={12}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Logo />
        </Col>

        <Col xs={24} sm={24} md={12}>
          <Form
            form={form}
            layout="vertical"
            name="basic"
            style={{ maxWidth: "100%" }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Flex justify="center" style={{ marginBottom: 30 }}>
              <Title style={{ color: "#45AE4D" }} level={1}>
                Şifremi Unuttum
              </Title>
            </Flex>

            <Form.Item<FieldType>
              label="E-mail"
              name="email"
              rules={[
                { required: true, message: "Lütfen e-mail adresinizi girin!" },
              ]}
            >
              <Input type="email" />
            </Form.Item>

            <Form.Item label={null}>
              <Row justify="space-between" align="middle">
                <Col>
                  <Button
                    style={{ padding: "0px" }}
                    type="link"
                    onClick={() => {
                      navigate("/");
                    }}
                  >
                    Giriş Yap
                  </Button>
                </Col>
                <Col>
                  <Button type="primary" htmlType="submit">
                    Gönder
                  </Button>
                </Col>
              </Row>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Flex>
  );
};

export default ForgotPassword;
