import { useState } from "react";
import { Tab } from "../../components";
import { tabTitles } from "../../constants";
import { TabContainer } from "../../containers";
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

  const contents = [
    <TabContainer>
      <Form
        selectedAction={selectedAction}
        setSelectedAction={setSelectedAction}
      />
      <DataTable setSelectedAction={setSelectedAction} />
    </TabContainer>,
  ];

  return <Tab tabs={tabTitles.account} contents={contents} />;
}
