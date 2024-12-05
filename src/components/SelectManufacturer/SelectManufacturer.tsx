import { TreeSelect } from "antd";

import { useQuery } from "@tanstack/react-query";

import { getManufacturers } from "../../services/manufacturerService";
interface SelectManufacturerProps<T> {
  value?: T;
  onChange?: (value: T) => void;
}
export default function SelectManufacturer<T>({
  value,
  onChange,
}: SelectManufacturerProps<T>) {
  const { data, isLoading } = useQuery({
    queryFn: getManufacturers,
    queryKey: ["manufacturers"],
  });
  const getTreeData = () => {
    let datas = [] as any[];
    data?.list.map((item, index) => {
      let object = {
        title: item.name,
        value: item.id,
      } as any;
      datas.push(object);
    });
    return data ? datas : [];
  };
  return (
    <TreeSelect
      treeIcon
      placeholder="Üretici Firma Seçiniz"
      value={value}
      onChange={onChange}
      style={{ width: "100%" }}
      dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
      treeDefaultExpandAll
      loading={isLoading}
      treeData={getTreeData()}
    />
  );
}
