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
  Spin,
  Typography,
} from "antd";

import Logo from "../../components/Logo/Logo";
import { useMutation, useQuery as useQueryTan } from "@tanstack/react-query";
import { resetPassword, verifyToken } from "../../services/userService";
import { useLocation, useNavigate } from "react-router-dom";

type FieldType = {
  password?: string;
  passwordAgain?: string;
};
const { Title } = Typography;
const useTokenQuery = () => {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]).get(
    "token"
  );
};
const ResetPassword: React.FC = (props) => {
  let token = useTokenQuery();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();

  const { data, isLoading, isError } = useQueryTan({
    queryKey: ["verifyToken"],
    queryFn: (data) => {
      return verifyToken(token as string);
    },
    retry: 1,
  });
  const updatePassword = useMutation({
    mutationFn: (values: FieldType) => {
      return resetPassword(token as string, values.password as string);
    },
    onError: (error) => {
      api.error({
        message: "Şifre değiştirilirken bir hata oluştu.",
        description: error.message,
      });
    },
    onSuccess: () => {
      api.success({
        message: "Şifre başarıyla değiştirildi.",
      });
      form.resetFields();
      setTimeout(() => {
        navigate("/");
      }, 2000);
    },
  });

  if (isError) {
    navigate("/");
  }

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    updatePassword.mutate(values);
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
          <Spin spinning={isLoading}>
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
                  Şifre Sıfırla
                </Title>
              </Flex>

              <Form.Item<FieldType>
                label="Şifre"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Lütfen şifrenizi girin!",
                  },
                  {
                    validator: async (_, value) => {
                      if (!value) {
                        return Promise.reject("Lütfen şifrenizi girin!");
                      }
                      if (value.length < 6) {
                        return Promise.reject(
                          "Şifre en az 6 karakter olmalıdır!"
                        );
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item<FieldType>
                label="Şifre Tekrar"
                name="passwordAgain"
                dependencies={["password"]}
                rules={[
                  {
                    required: true,
                    message: "Lütfen şifrenizi tekrar girin!",
                  },
                  {
                    validator: async (_, value) => {
                      if (!value) {
                        return Promise.reject("Lütfen şifrenizi tekrar girin!");
                      }
                      if (value !== form.getFieldValue("password")) {
                        return Promise.reject("Şifreler eşleşmiyor!");
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item label={null}>
                <Row justify="center" align="middle">
                  <Col>
                    <Button type="primary" htmlType="submit">
                      Gönder
                    </Button>
                  </Col>
                </Row>
              </Form.Item>
            </Form>
          </Spin>
        </Col>
      </Row>
    </Flex>
  );
};

export default ResetPassword;
