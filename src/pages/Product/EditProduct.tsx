import { Flex, FormProps, Image, notification, Typography, Upload } from "antd";
import React, { useEffect } from "react";

import { Button, Form, Input, Select } from "antd";
import SelectCategory from "../../components/SelectCategory/SelectCategory";
import TextArea from "antd/es/input/TextArea";
import CreateProductRequest from "../../payload/request/CreateProductRequest";
import { PlusOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createProduct,
  getProduct,
  getProductImage,
} from "../../services/productService";
import { useParams } from "react-router-dom";
const { Title } = Typography;

export default function EditProduct() {
  const [form] = Form.useForm();
  const { id } = useParams();
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
  const getProductImageMutation = useMutation({
    mutationFn: async (imageName: string) => {
      return await getProductImage(imageName);
    },
    onSuccess(data, variables, context) {},
  });
  useQuery({
    queryFn: async () => {
      if (id) {
        let res = await getProduct(parseInt(id));
        if (res.entity) {
          form.setFieldsValue(res.entity);
          for (let i = 0; i < res.entity.images.length; i++) {
            const image = await getProductImageMutation.mutateAsync(
              res.entity.images[i].imageUrl
            );
            var reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onloadend = function () {
              setFileList((fileList) => [
                ...fileList,
                {
                  uid: res.entity.images[i].id,
                  name: "image.png",
                  status: "done",
                  url: reader.result,
                  thumbUrl: reader.result,
                },
              ]);
            };
          }
        }
        return res;
      }
      return null;
    },
    queryKey: [`product-${id}`],
  });

  const { mutate } = useMutation({
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
    mutate(formData);
  };
  return (
    <>
      {contextHolder}
      <Flex vertical align="center" gap={30}>
        <Title level={2}>Ürün Düzenle</Title>
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
            valuePropName="fileList"
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) {
                return e;
              }
              return e && e.fileList;
            }}
            noStyle
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
              onRemove={(file) => {
                if (typeof file.uid === "number") {
                  console.log(file.uid);
                  return false;
                }
                return true;
              }}
              maxCount={5}
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Resim Ekle</div>
              </div>
            </Upload>
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
          </Form.Item>

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
            label="Ürün Adı"
            name={"name"}
            rules={[
              {
                required: true,
                message: "Bu alan zorunludur.",
              },
            ]}
          >
            <Input />
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
