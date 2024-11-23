import { InfoCircleOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button, Divider, Form, FormProps, Input, Radio, Space } from "antd";
import { getSetting } from "../../services/settingService";
type FieldType = {
  maxProductCount?: string;
  productAutoRemoveDay?: string;
};
export default function Settings() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["setting"],
    queryFn: getSetting,
  });

  const [form] = Form.useForm();
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Divider orientation="left" style={{ borderColor: "#7cb305" }}>
        İlan Ayarları
      </Divider>
      <Form
        layout={"vertical"}
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={{ layout: "vertical" }}
        style={{ maxWidth: 600 }}
      >
        <Form.Item
          label="Maksimum İlan Sayısı"
          name={"maxProductCount"}
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
          name={"productAutoRemoveDay"}
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

        <Form.Item>
          <Button htmlType="submit" type="primary">
            Kaydet
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
