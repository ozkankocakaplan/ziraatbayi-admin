import { TreeSelect } from "antd";
import React from "react";
import { rootCategory } from "../../helper/helper";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../services/categoryService";
interface SelectCategoryProps<T> {
  showRootCategory?: boolean;
  isOnlySelectSub?: boolean;
  value?: T;
  onChange?: (value: T) => void;
}
export default function SelectCategory<T>({
  showRootCategory = true,
  isOnlySelectSub = false,
  value,
  onChange,
}: SelectCategoryProps<T>) {
  const { data: categories, isLoading } = useQuery({
    queryFn: getCategories,
    queryKey: ["categories"],
  });
  const getTreeData = () => {
    let datas = [] as any[];
    if (showRootCategory) {
      datas.push(rootCategory);
    }
    categories?.list.map((item, index) => {
      if (item.isActive) {
        let object = {
          title: item.name,
          value: item.id,
        } as any;
        if (item?.children?.length > 0) {
          if (isOnlySelectSub) {
            object.disabled = true;
          }
          object.children = recursive(item.children, index);
        }
        datas.push(object);
      }
    });
    return categories ? datas : [];
  };
  const recursive = (data: any[], i: number) => {
    let datas = [] as any[];
    data.map((item, index) => {
      if (item.isActive) {
        let object = {
          title: item.name,
          value: item.id,
        } as any;
        if (item?.children?.length > 0) {
          if (isOnlySelectSub) {
            object.disabled = true;
          }
          object.children = recursive(item.children, index);
        }
        datas.push(object);
      }
    });
    return datas;
  };
  return (
    <TreeSelect
      treeIcon
      placeholder="Kategori Seçiniz"
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
