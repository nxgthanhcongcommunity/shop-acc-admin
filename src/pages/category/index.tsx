import { Flex } from "antd";
import { useState } from "react";
import { ICategory } from "../../models";
import { IActionProps } from "../../prop-types";
import DataTable from "./dataTable";
import Form from "./form";

export default function Category() {
  const [selectedAction, setSelectedAction] = useState<
    IActionProps<ICategory | null>
  >({
    action: "create",
    record: null,
  });

  return (
    <Flex vertical style={{ width: "100%" }}>
      <Form
        selectedAction={selectedAction}
        setSelectedAction={setSelectedAction}
      />
      <DataTable setSelectedAction={setSelectedAction} />
    </Flex>
  );
}
