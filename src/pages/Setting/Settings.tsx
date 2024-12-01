import { InfoCircleOutlined } from "@ant-design/icons";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  Button,
  Divider,
  Flex,
  Form,
  FormProps,
  Input,
  notification,
  Spin,
  Typography,
} from "antd";
import { getSetting, updateSetting } from "../../services/settingService";
import { useEffect } from "react";
import SettingRequest from "../../payload/request/SettingRequest";
type FieldType = {
  maxAdvertCount?: string;
  advertAutoRemoveDay?: string;
};
const { Title } = Typography;
export default function Settings() {
  const [api, contextHolder] = notification.useNotification();
  const queryClient = useQueryClient();
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["setting"],
    queryFn: getSetting,
  });

  const [form] = Form.useForm();
  const { mutate, isSuccess, isPending } = useMutation({
    mutationFn: (values: SettingRequest) => updateSetting(values),
    onSuccess: () => {
      api.success({
        message: "Ayarlar başarıyla güncellendi.",
      });
      queryClient.invalidateQueries({
        queryKey: ["setting"],
      });
    },
    onError: (error) => {
      api.error({
        message: "Ayarlar güncellenirken bir hata oluştu.",
        description: error.message,
      });
    },
  });

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data.entity);
    }
  }, [data]);

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const data = {
      maxAdvertCount: parseInt(values.maxAdvertCount!),
      advertAutoRemoveDay: parseInt(values.advertAutoRemoveDay!),
    } as SettingRequest;
    mutate(data);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Spin spinning={isLoading || isFetching}>
      {contextHolder}
      <Flex align="center" vertical gap={30}>
        <Title level={2}>İlan Ayarları</Title>
        <Form
          layout={"vertical"}
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={{ layout: "vertical" }}
          style={{ maxWidth: 500, width: "100%" }}
        >
          <Form.Item
            label="Maksimum İlan Sayısı"
            name={"maxAdvertCount"}
            tooltip={{
              title:
                "Bayinin aynı anda bulunabilecek maksimum ilan sayısını belirler.",
              icon: <InfoCircleOutlined />,
            }}
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
            label="Otomatik İlan Silme Günü"
            name={"advertAutoRemoveDay"}
            tooltip={{
              title:
                "Belirtilen gün sayısından sonra bayinin ilanları otomatik olarak kaldırılır.",
              icon: <InfoCircleOutlined />,
            }}
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
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button htmlType="submit" type="primary">
              Kaydet
            </Button>
          </Form.Item>
        </Form>
      </Flex>
    </Spin>
  );
}
