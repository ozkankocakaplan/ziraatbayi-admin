import { InfoCircleOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  Button,
  Flex,
  Form,
  FormProps,
  Input,
  notification,
  Spin,
  Typography,
} from "antd";
import { getPlanPriceList, updatePlanPrice } from "../../services/planService";
import { useEffect } from "react";
import UpdatePlanPriceRequest from "../../payload/request/UpdatePlanPriceRequest";
import { onError } from "../../helper/helper";

const { Title } = Typography;
export default function EditPlan() {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [api, contextHolder] = notification.useNotification();

  const { data: priceList, isLoading } = useQuery({
    queryKey: ["planPriceList"],
    queryFn: async () => {
      return getPlanPriceList();
    },
  });
  useEffect(() => {
    if (priceList) {
      form.setFieldsValue({
        monthlyPrice: priceList?.entity?.monthlyPrice || "",
        yearlyPrice: priceList?.entity?.yearlyPrice || "",
      });
    }
  }, [priceList]);

  const updateMutation = useMutation({
    mutationFn: async (values: UpdatePlanPriceRequest) => {
      return updatePlanPrice(values);
    },
    onError: (error: any) => {
      onError(error, api);
    },
    onSuccess: (data) => {
      if (data.isSuccessful) {
        queryClient.invalidateQueries({
          queryKey: ["planPriceList"],
        });
        api.success({
          message: "Başarılı",
          description: "Plan fiyatları güncellendi.",
        });
      } else {
        api.error({
          message: "Hata",
          description: data.message,
        });
      }
    },
  });

  const onFinish: FormProps<UpdatePlanPriceRequest>["onFinish"] = (values) => {
    updateMutation.mutate(values);
  };

  return (
    <Spin spinning={isLoading}>
      {contextHolder}
      <Flex align="center" vertical gap={30}>
        <Title level={2}>Plan Fiyat Ayarları</Title>
        <Form
          layout={"vertical"}
          form={form}
          onFinish={onFinish}
          initialValues={{ layout: "vertical" }}
          style={{ maxWidth: 500, width: "100%" }}
        >
          <Form.Item
            label="Aylık Plan Fiyatı"
            name={"monthlyPrice"}
            tooltip={{
              title:
                "Bu ayar bir sonraki ay için geçerli olacak şekilde ayarlanır.",
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
            label="Yıllık Plan Fiyatı"
            name={"yearlyPrice"}
            tooltip={{
              title:
                "Fiyatlandırma bir sonraki yıl için geçerli olacak şekilde ayarlanır.",
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
