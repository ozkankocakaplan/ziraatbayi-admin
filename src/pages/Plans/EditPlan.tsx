import { InfoCircleOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";
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
  InputNumber,
  Space,
  Card,
  Divider,
} from "antd";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { UpdatePlanRequest, PlanDescriptionDto } from "../../payload/request/UpdatePlanRequest";
import { onError } from "../../helper/helper";
import { getPlanById, updatePlan } from "../../services/planService";

const { Title, Text } = Typography;

export default function EditPlan() {
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [api, contextHolder] = notification.useNotification();

  const { data: plan, isLoading } = useQuery({
    queryKey: ["plan", id],
    queryFn: async () => {
      return getPlanById(Number(id));
    },
    enabled: !!id
  });

  useEffect(() => {
    if (plan?.entity) {
      form.setFieldsValue({
        planName: plan.entity.planName,
        description: plan.entity.description,
        price: plan.entity.price,
        discountPrice: plan.entity.discountPrice,
        trialPeriodDays: plan.entity.trialPeriodDays,
        cancelPeriodDays: plan.entity.cancelPeriodDays,
        descriptions: plan.entity.descriptions || [],
      });
    }
  }, [plan, form]);

  const updateMutation = useMutation({
    mutationFn: async (values: UpdatePlanRequest) => {
      return updatePlan({ ...values, id: Number(id) });
    },
    onError: (error: any) => {
      onError(error, api);
    },
    onSuccess: (data) => {
      if (data.isSuccessful) {
        queryClient.invalidateQueries({
          queryKey: ["plan", id],
        });
        queryClient.invalidateQueries({
          queryKey: ["plans"],
        });
        api.success({
          message: "Başarılı",
          description: "Plan başarıyla güncellendi.",
        });
      } else {
        api.error({
          message: "Hata",
          description: data.message,
        });
      }
    },
  });

  const onFinish: FormProps<UpdatePlanRequest>["onFinish"] = (values) => {
    updateMutation.mutate(values);
  };

  return (
    <Spin spinning={isLoading}>
      {contextHolder}
      <Flex align="center" vertical gap={30}>
        <Title level={2}>Plan Düzenle</Title>
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          style={{ maxWidth: 600, width: "100%" }}
        >
          <Card>
            <Title level={4}>Temel Bilgiler</Title>
            <Form.Item
              label="Plan Adı"
              name="planName"
              rules={[{ required: true, message: "Plan adı zorunludur" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Açıklama"
              name="description"
              rules={[{ required: true, message: "Açıklama zorunludur" }]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
          </Card>

          <Card style={{ marginTop: 16 }}>
            <Title level={4}>Fiyatlandırma ve Süreler</Title>
            <Form.Item
              label="Fiyat"
              name="price"
              rules={[{ required: true, message: "Fiyat zorunludur" }]}
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              label="İndirimli Fiyat"
              name="discountPrice"
              rules={[{ required: true, message: "İndirimli fiyat zorunludur" }]}
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              label="Deneme Süresi (Gün)"
              name="trialPeriodDays"
              rules={[{ required: true, message: "Deneme süresi zorunludur" }]}
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              label="İptal Süresi (Gün)"
              name="cancelPeriodDays"
              rules={[{ required: true, message: "İptal süresi zorunludur" }]}
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
          </Card>

          <Card style={{ marginTop: 16 }}>
            <Flex justify="space-between" align="center">
              <div>
                <Title level={4} style={{ marginBottom: 0 }}>Plan Özellikleri</Title>
                <Text type="secondary">
                  Bu özellikler müşterilere planın içeriğini göstermek için kullanılacaktır.
                </Text>
              </div>
            </Flex>
            <Divider />
            
            <Form.List name="descriptions">
              {(fields, { add, remove }) => (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {fields.map(({ key, name, ...restField }, index) => (
                    <Card 
                      key={key} 
                      size="small" 
                      bordered={false} 
                      style={{ backgroundColor: '#f5f5f5' }}
                    >
                      <Flex align="center" gap={16}>
                        <div style={{ marginRight: 8 }}>
                          <Text strong>{index + 1}.</Text>
                        </div>
                        <Form.Item
                          {...restField}
                          name={[name, 'description']}
                          style={{ flex: 1, marginBottom: 0 }}
                          rules={[{ required: true, message: 'Özellik açıklaması zorunludur' }]}
                        >
                          <Input placeholder="Plan özelliğini buraya yazın..." />
                        </Form.Item>
                        <Button 
                          type="text" 
                          icon={<DeleteOutlined />} 
                          onClick={() => remove(name)}
                          danger
                        />
                      </Flex>
                    </Card>
                  ))}
                  <Button 
                    type="dashed" 
                    onClick={() => add()} 
                    icon={<PlusOutlined />}
                    style={{ marginTop: 8 }}
                  >
                    Yeni Özellik Ekle
                  </Button>
                </div>
              )}
            </Form.List>
          </Card>

          <Form.Item style={{ marginTop: 24 }}>
            <Button type="primary" htmlType="submit" block size="large">
              Planı Güncelle
            </Button>
          </Form.Item>
        </Form>
      </Flex>
    </Spin>
  );
}
