import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Flex, Form, FormProps, Input, notification, Spin } from "antd";

import { Typography } from "antd";

import { getUserInfo, updateProfile } from "../../services/userService";
import { useEffect } from "react";
import { onError } from "../../helper/helper";
import UpdateUserRequest from "../../payload/request/UpdateUserRequest";

const { Title } = Typography;

export default function Profile() {
  const [api, contextHolder] = notification.useNotification();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const { data, isLoading } = useQuery({
    queryKey: ["getProfile"],
    queryFn: async () => {
      return getUserInfo();
    },
  });

  const handleUpdateProfile = useMutation({
    mutationFn: async (values: UpdateUserRequest) => {
      return updateProfile(values);
    },
    onError: (err: any) => {
      onError(err, api);
    },
    onSuccess: () => {
      if (data?.isSuccessful) {
        api.success({
          message: "Başarılı",
          description: "Profil bilgileriniz güncellendi.",
        });
        queryClient.invalidateQueries({ queryKey: ["getProfile"] });
      }
    },
  });

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data.entity);
    }
  }, [data]);

  const onFinish: FormProps<UpdateUserRequest>["onFinish"] = (values) => {
    handleUpdateProfile.mutate(values);
  };

  return (
    <Spin spinning={isLoading}>
      {contextHolder}
      <Flex vertical align="center" gap={30}>
        <Title level={2}>Profil Bilgilerim</Title>

        <Form
          layout={"vertical"}
          form={form}
          onFinish={onFinish}
          initialValues={{ layout: "vertical" }}
          style={{ maxWidth: 600, width: "100%" }}
          labelCol={{ span: 21 }}
        >
          <Form.Item
            label="Ad"
            name={"firstName"}
            rules={[
              {
                required: true,
                message: "Bu alan zorunludur.",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Soyad"
            name={"lastName"}
            rules={[
              {
                required: true,
                message: "Bu alan zorunludur.",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="E-posta"
            name={"email"}
            rules={[
              {
                required: true,
                message: "Bu alan zorunludur.",
              },
            ]}
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item
            label="Telefon"
            name={"phone"}
            rules={[
              {
                required: true,
                message: "Bu alan zorunludur.",
              },
            ]}
          >
            <Input type="phone" />
          </Form.Item>
          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Kaydet
            </Button>
          </Form.Item>
        </Form>
      </Flex>
    </Spin>
  );
}
