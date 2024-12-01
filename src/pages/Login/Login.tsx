import React from "react";
import type { FormProps } from "antd";
import { Button, Checkbox, Flex, Form, Input, notification } from "antd";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../services/authService";
import { Navigate, useNavigate } from "react-router-dom";
import useAuth from "../../context/AuthContext";
import { LoginResponse } from "../../payload/response/LoginResponse";
import { LoginRequest } from "../../payload/request/LoginRequest";
import ServiceResponse from "../../payload/response/ServiceResponse";

type FieldType = {
  email?: string;
  password?: string;
  remember?: string;
};

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
    <Flex align="center" justify="center" style={{ height: "100vh" }}>
      {contextHolder}
      <Form
        layout="vertical"
        name="basic"
        style={{ width: 430 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        labelCol={{ span: 19 }}
      >
        <Form.Item<FieldType>
          label="E-mail"
          name="email"
          rules={[
            { required: true, message: "Lütfen e-mail adresinizi girin!" },
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

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Giriş Yap
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
};

export default App;
