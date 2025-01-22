import { Flex, FormProps, Image, notification, Typography, Upload } from "antd";
import React, { useEffect } from "react";

import { Button, Form, Input, Select } from "antd";
import SelectCategory from "../../components/SelectCategory/SelectCategory";
import TextArea from "antd/es/input/TextArea";
import CreateProductRequest from "../../payload/request/CreateProductRequest";
import { PlusOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { createProduct } from "../../services/productService";
import SelectManufacturer from "../../components/SelectManufacturer/SelectManufacturer";
const { Title } = Typography;

export default function AddProduct() {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const [fileList, setFileList] = React.useState<any[]>([]);
  const [previewImage, setPreviewImage] = React.useState<string>("");
  const [previewOpen, setPreviewOpen] = React.useState<boolean>(false);
  useEffect(() => {
    form.setFieldsValue({ name: "", description: "" });
    return () => {
      form.resetFields();
      setFileList([]);
    };
  }, []);

  const { mutate, isPending } = useMutation({
    mutationFn: createProduct,
    onSuccess(data, variables, context) {
      if (data.isSuccessful) {
        api.success({
          message: "Başarılı",
          description: "Ürün başarıyla eklendi.",
        });
        form.resetFields();
        setFileList([]);
      }
    },
    onError(error) {
      api.error({
        message: "Hata",
        description: "Ürün eklenirken bir hata oluştu.",
      });
    },
  });

  const onFinish: FormProps<CreateProductRequest>["onFinish"] = (values) => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("files", file.originFileObj);
    });
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("categoryId", values.categoryId.toString());
    formData.append("manufacturerId", values.manufacturerId.toString());
    formData.append("activeSubstance", values.activeSubstance);
    mutate(formData);
  };
  return (
    <>
      {contextHolder}
      <Flex vertical align="center" gap={30}>
        <Title level={2}>Ürün Ekle</Title>
        <Form
          layout={"vertical"}
          form={form}
          onFinish={onFinish}
          initialValues={{ layout: "vertical" }}
          style={{ maxWidth: 600, width: "100%" }}
          labelCol={{ span: 21 }}
        >
          <Form.Item
            label="Ürün Resimleri"
          >
            <Upload
              listType="picture-card"
              fileList={fileList}
              beforeUpload={() => false}
              onChange={({ fileList }) => setFileList(fileList)}
              onPreview={(file) => {
                setPreviewOpen(true);
                setPreviewImage(file.thumbUrl || "");
              }}
              maxCount={5}
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Resim Ekle</div>
              </div>
            </Upload>
          </Form.Item>
          {previewImage && (
            <Image
              wrapperStyle={{ display: "none" }}
              preview={{
                visible: previewOpen,
                onVisibleChange: (visible) => setPreviewOpen(visible),
                afterOpenChange: (visible) => !visible && setPreviewImage(""),
              }}
              src={previewImage}
            />
          )}

          <Form.Item
            style={{ marginTop: 20 }}
            label="Kategori"
            name={"categoryId"}
            rules={[
              {
                required: true,
                message: "Bu alan zorunludur.",
              },
            ]}
          >
            <SelectCategory
              isOnlySelectSub
              showRootCategory={false}
              onChange={(value) => form.setFieldsValue({ categoryId: value })}
            />
          </Form.Item>
          <Form.Item
            style={{ marginTop: 20 }}
            label="Üretici Firma"
            name={"manufacturerId"}
            rules={[
              {
                required: true,
                message: "Bu alan zorunludur.",
              },
            ]}
          >
            <SelectManufacturer
              onChange={(value) =>
                form.setFieldsValue({ manufacturerId: value })
              }
            />
          </Form.Item>
          <Form.Item
            label="Ürün Adı"
            name={"name"}
            rules={[
              {
                required: true,
                message: "Bu alan zorunludur.",
              },
            ]}
          >
            <Input placeholder="Ürün adını giriniz." />
          </Form.Item>
          <Form.Item
            label="Etken Madde"
            name={"activeSubstance"}
            rules={[
              {
                required: true,
                message: "Bu alan zorunludur.",
              },
            ]}
          >
            <Input placeholder="Etken maddeyi giriniz." />
          </Form.Item>
          <Form.Item label="Açıklama" name={"description"}>
            <TextArea
              autoSize={{
                minRows: 3,
                maxRows: 6,
              }}
            />
          </Form.Item>
          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Kaydet
            </Button>
          </Form.Item>
        </Form>
      </Flex>
    </>
  );
}
