import { FolderOutlined } from "@ant-design/icons";

export const rootCategory = {
  title: "Ana Kategori",
  value: "0",
  icon: <FolderOutlined />,
};
export const getErrorMessage: (error: string[]) => string = (error) => {
  return error.join("\n");
};
