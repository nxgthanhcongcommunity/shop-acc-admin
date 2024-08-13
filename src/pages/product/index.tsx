import { Flex } from "antd";
import { useState } from "react";
import "react-responsive-pagination/themes/classic.css";
import { IProduct } from "../../models";
import { IActionProps } from "../../prop-types";
import DataTable from "./dataTable";
import Form from "./form";

export default function Component() {
  const [selectedAction, setSelectedAction] = useState<
    IActionProps<IProduct | null>
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
