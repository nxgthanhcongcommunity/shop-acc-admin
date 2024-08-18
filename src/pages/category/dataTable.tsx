import { Space, Table, TableProps } from "antd";
import { ICategory } from "../../models";
import { useGetAllCategoriesQuery } from "../../api/categoryApi";

const DataTable = (props: any) => {
  const { setSelectedAction } = props;
  const { isLoading, data } = useGetAllCategoriesQuery();

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

  return <Table columns={columns} dataSource={data?.records ?? []} />;
};

export default DataTable;
