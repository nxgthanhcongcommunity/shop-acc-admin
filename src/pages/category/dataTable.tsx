import { Space, Table, TableProps } from "antd";
import React, { useEffect, useState } from "react";
import { categoryApi } from "../../api";
import { ICategory } from "../../models";

const DataTable = (props: any) => {
  const { setSelectedAction } = props;
  const [records, setRecords] = React.useState<ICategory[]>(() => []);
  const [reloadGridToggle, setReloadGridToggle] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const response = await categoryApi.GetCategories({});
      if (!response.succeed) return;

      setRecords(response.data.data);
    })();
  }, [reloadGridToggle]);

  const columns: TableProps<ICategory>["columns"] = [
    {
      title: "Hình ảnh",
      dataIndex: "mainFileCLDId",
      key: "mainFileCLDId",
    },
    {
      title: "Tên loại",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mã",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Banner",
      dataIndex: "bannerCode",
      key: "bannerCode",
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => setSelectedAction({ action: "update", record })}>
            Cập nhật
          </a>
          <Space size="small" />
          <a onClick={() => setSelectedAction({ action: "delete", record })}>
            Xóa
          </a>
        </Space>
      ),
    },
  ];

  return <Table columns={columns} dataSource={records} />;
};

export default DataTable;
