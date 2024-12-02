import React from "react";
import type { FormProps } from "antd";
import {
  Button,
  Checkbox,
  Col,
  Flex,
  Form,
  Input,
  notification,
  Row,
  Spin,
  Typography,
} from "antd";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../services/authService";
import { Navigate, useNavigate } from "react-router-dom";
import useAuth from "../../context/AuthContext";
import { LoginResponse } from "../../payload/response/LoginResponse";
import { LoginRequest } from "../../payload/request/LoginRequest";
import ServiceResponse from "../../payload/response/ServiceResponse";
import Logo from "../../components/Logo/Logo";

type FieldType = {
  email?: string;
  password?: string;
  remember?: string;
};
const { Title } = Typography;
const App: React.FC = () => {
  const { login: setLogin, isLoading, isAuth } = useAuth();
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const mutation = useMutation<
    ServiceResponse<LoginResponse>,
    Error,
    LoginRequest
  >({
    mutationFn: login,
    onSuccess: (data) => {
      setLogin(data.entity.token);
      navigate("/admin");
    },
    onError: (error) => {
      api.error({
        message: "Hata",
        description: "E-posta veya şifre hatalı",
      });
    },
  });
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    mutation.mutate(values as LoginRequest);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  if (isAuth && !isLoading) {
    return <Navigate to="/admin" />;
  }
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
          <Spin spinning={mutation.isPending}>
            <Form
              layout="vertical"
              name="basic"
              style={{ maxWidth: "100%" }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Flex justify="center" style={{ marginBottom: 30 }}>
                <Title style={{ color: "#45AE4D" }} level={1}>
                  Giriş Yap
                </Title>
              </Flex>
              <Form.Item<FieldType>
                label="E-mail"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Lütfen e-mail adresinizi girin!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item<FieldType>
                label="Şifre"
                name="password"
                rules={[{ required: true, message: "Lütfen şifrenizi girin!" }]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item>
                <Button
                  type="link"
                  style={{ padding: 0 }}
                  onClick={() => {
                    navigate("/forgot-password");
                  }}
                >
                  Şifremi Unuttum
                </Button>
              </Form.Item>

              <Form.Item
                label={null}
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Button type="primary" htmlType="submit">
                  Giriş Yap
                </Button>
              </Form.Item>
            </Form>
          </Spin>
        </Col>
      </Row>
    </Flex>
  );
};

export default App;
