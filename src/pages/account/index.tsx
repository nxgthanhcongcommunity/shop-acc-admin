import { Flex } from "antd";
import DataTable from "./dataTable";

export default function Account() {
  return (
    <Flex vertical style={{ width: "100%" }}>
      <DataTable />
    </Flex>
  );
}
