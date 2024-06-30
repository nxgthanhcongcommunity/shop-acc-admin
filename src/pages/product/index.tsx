import "react-responsive-pagination/themes/classic.css";
import { Tab } from "../../components";
import { tabTitles } from "../../constants";
import { TabContainer } from "../../containers";
import DataTable from "./dataTable";
import Form from "./form";
import { IProduct } from "../../models";
import { IActionProps } from "../../prop-types";
import { useState } from "react";

export default function Component() {
  const [selectedAction, setSelectedAction] = useState<
    IActionProps<IProduct | null>
  >({
    action: "create",
    record: null,
  });

  const contents = [
    <TabContainer>
      <Form
        selectedAction={selectedAction}
        setSelectedAction={setSelectedAction}
      />
      <DataTable setSelectedAction={setSelectedAction} />
    </TabContainer>,
  ];

  return <Tab tabs={tabTitles.banner} contents={contents} />;
}
