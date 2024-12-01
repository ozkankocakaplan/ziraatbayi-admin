import {
  Flex,
  FormProps,
  Image,
  Modal,
  notification,
  Spin,
  Switch,
  Typography,
  Upload,
  UploadProps,
} from "antd";
import React, { useEffect } from "react";

import { Button, Form, Input, Select } from "antd";
import SelectCategory from "../../components/SelectCategory/SelectCategory";
import TextArea from "antd/es/input/TextArea";
import CreateProductRequest from "../../payload/request/CreateProductRequest";
import { PlusOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addProductImage,
  createProduct,
  deleteProductImage,
  getProduct,
  getProductImage,
  updateProduct,
} from "../../services/productService";
import { useParams } from "react-router-dom";
import UpdateProductRequest from "../../payload/request/UpdateProductRequest";
import { onError } from "../../helper/helper";
const { Title } = Typography;

export default function EditProduct() {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const { id } = useParams();
  const [api, contextHolder] = notification.useNotification();
  const [fileList, setFileList] = React.useState<any[]>([]);
  const [previewImage, setPreviewImage] = React.useState<string>("");
  const [previewOpen, setPreviewOpen] = React.useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [selectedImageId, setSelectedImageId] = React.useState<number>(0);
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
  const { isPending: isProductLoading } = useQuery({
    queryFn: async () => {
      if (id) {
        setFileList([]);
        let res = await getProduct(parseInt(id));

        if (res.entity) {
          form.setFieldsValue(res.entity);

          const updatedFileList = await Promise.all(
            res.entity.images.map(async (imageData, index) => {
              const fileEntity = {
                uid: imageData.id,
                name: "image.png",
                status: "uploading",
                percent: 33,
              };

              setFileList((prev) => [...prev, fileEntity]);

              try {
                const image = await getProductImageMutation.mutateAsync(
                  imageData.imageUrl
                );

                const reader = new FileReader();
                const base64 = await new Promise((resolve, reject) => {
                  reader.onloadend = () => resolve(reader.result);
                  reader.onerror = reject;
                  reader.readAsDataURL(image);
                });

                return {
                  uid: imageData.id,
                  name: "image.png",
                  status: "done",
                  url: base64,
                  thumbUrl: base64,
                };
              } catch (error) {
                return {
                  uid: imageData.id,
                  name: "image.png",
                  status: "error",
                  error: true,
                };
              }
            })
          );
          setFileList(updatedFileList);
        }
        return res;
      }
      return null;
    },
    queryKey: [`product-${id}`],
  });
  const handleChange: UploadProps["onChange"] = (info) => {
    let item = info.file;
    item.status = "uploading";
    item.percent = 33;
    setFileList([...fileList, item]);
    const formData = new FormData();
    formData.append("file", info.file as any);
    formData.append("productId", id?.toString() || "");
    uploadFile.mutate(formData);
  };
  const uploadFile = useMutation({
    mutationFn: addProductImage,
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({
        queryKey: [`product-${id}`],
      });
      api.success({
        message: "Başarılı",
        description: "Resim başarıyla eklendi.",
      });
    },
    onError(er: any) {
      onError(er, api);
    },
  });
  const { mutate } = useMutation({
    mutationFn: (data: UpdateProductRequest) => {
      console.log(data, "data");
      return updateProduct(data);
    },
    onSuccess(data, variables, context) {
      if (data.isSuccessful) {
        api.success({
          message: "Başarılı",
          description: "Ürün başarıyla güncellendi.",
        });
        queryClient.invalidateQueries({
          queryKey: [`product-${id}`],
        });
      }
    },
    onError(er: any) {
      onError(er, api);
    },
  });

  const onFinish: FormProps<UpdateProductRequest>["onFinish"] = (values) => {
    if (id) {
      let data = {
        ...values,
        id: parseInt(id),
      };
      mutate(data);
    }
  };
  let handleDeleteProductImage = useMutation({
    mutationFn: deleteProductImage,
    onSuccess(data, variables, context) {
      setIsModalOpen(false);
      setSelectedImageId(0);
      api.success({
        message: "Başarılı",
        description: "Resim başarıyla silindi.",
      });
      queryClient.invalidateQueries({
        queryKey: [`product-${id}`],
      });
    },
    onError(error) {
      setIsModalOpen(false);
      setSelectedImageId(0);
      api.error({
        message: "Hata",
        description: "Resim silinirken bir hata oluştu.",
      });
    },
  });
  const handleOk = () => {
    if (selectedImageId === 0) return;
    handleDeleteProductImage.mutate(selectedImageId);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      {contextHolder}
      <Spin spinning={isProductLoading}>
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
                locale={{ uploading: "Yükleniyor" }}
                listType="picture-circle"
                fileList={fileList}
                beforeUpload={() => false}
                onChange={(fileList) => {
                  handleChange(fileList);
                }}
                onPreview={(file) => {
                  setPreviewOpen(true);
                  setPreviewImage(file.thumbUrl || "");
                }}
                onRemove={(file) => {
                  if (typeof file.uid === "number") {
                    setSelectedImageId(file.uid);
                    setIsModalOpen(true);
                    return false;
                  }
                  return true;
                }}
                accept="image/*"
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
                    afterOpenChange: (visible) =>
                      !visible && setPreviewImage(""),
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
            <Form.Item label="Durum" name={"isActive"}>
              <Switch defaultChecked={false} />
            </Form.Item>
            <Form.Item label={null}>
              <Button type="primary" htmlType="submit">
                Kaydet
              </Button>
            </Form.Item>
          </Form>
        </Flex>
        <Modal
          title="Resmi Sil"
          open={isModalOpen}
          onOk={handleOk}
          okText="Evet"
          cancelText="Hayır"
          onCancel={handleCancel}
        >
          <p>Resmi silmek istediğinize emin misiniz?</p>
        </Modal>
      </Spin>
    </>
  );
}
