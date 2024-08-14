import { Flex } from "antd";
import DataTable from "./dataTable";

export default function Balance() {
  return (
    <Flex vertical style={{ width: "100%" }}>
      <DataTable />
    </Flex>
  );
}
