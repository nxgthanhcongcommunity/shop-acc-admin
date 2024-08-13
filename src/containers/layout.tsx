import { DashboardOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Flex, Menu, MenuProps } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { ToastList } from "../components";

type MenuItem = Required<MenuProps>["items"][number];
const items: MenuItem[] = [
  {
    key: "sub1",
    label: "Bảng thống kê",
    icon: <DashboardOutlined />,
  },
  {
    key: "sub2",
    label: "Quản lý nội dung",
    icon: <MenuFoldOutlined />,
    children: [
      { key: "products", label: "Acc game" },
      { key: "categories", label: "Loại acc" },
      { key: "accounts", label: "Người dùng" },
      { key: "invoices", label: "Hóa đơn" },
      { key: "invoice-details", label: "Chi tiết hóa đơn" },
      { key: "sendmails", label: "Gửi mail tài khoản" },
      { key: "transactions", label: "Giao dịch" },
    ],
  },
];

const Layout = () => {
  const navigate = useNavigate();

  const onClick: MenuProps["onClick"] = ({ key }) => {
    navigate(key);
  };

  return (
    <>
      <ToastList />
      <Flex gap={8}>
        <Menu
          onClick={onClick}
          style={{ width: 256 }}
          defaultSelectedKeys={["products"]}
          defaultOpenKeys={["sub2"]}
          mode="inline"
          items={items}
        />
        <Outlet />
      </Flex>
    </>
  );
};

export default Layout;
