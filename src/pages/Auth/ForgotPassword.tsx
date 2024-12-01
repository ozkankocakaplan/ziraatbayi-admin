import React from "react";
import type { FormProps } from "antd";
import {
  Button,
  Flex,
  Form,
  Input,
  notification,
  Space,
  Typography,
} from "antd";

import { useNavigate } from "react-router-dom";

import Logo from "../../components/Logo/Logo";

type FieldType = {
  email?: string;
  password?: string;
};
const { Title } = Typography;
const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {};

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Flex
      align="center"
      justify="center"
      style={{ height: "100vh", background: "#f9f9f9" }}
    >
      {contextHolder}
      <Flex
        style={{
          background: "#fff",
          padding: 20,
          height: 450,
          gap: 30,
          maxWidth: 900,
          borderRadius: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <Logo />

        <Form
          layout="vertical"
          name="basic"
          style={{
            width: 430,
            justifyContent: "space-between",
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
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
            <Input />
          </Form.Item>

          <Form.Item label={null}>
            <Flex justify="space-between" align="center">
              <Button
                style={{ padding: "0px" }}
                type="link"
                onClick={() => {
                  navigate("/");
                }}
              >
                Giriş Yap
              </Button>
              <Button type="primary" htmlType="submit">
                Gönder
              </Button>
            </Flex>
          </Form.Item>
        </Form>
      </Flex>
    </Flex>
  );
};

export default ForgotPassword;
