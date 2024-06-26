import { Tab } from "../../components";
import { tabTitles } from "../../constants";
import { TabContainer } from "../../containers";
import DataTable from "./dataTable";

export default function Account() {

  const contents = [
    (
      <TabContainer>
        <DataTable />
      </TabContainer>
    ),
  ]

  return (
    <Tab tabs={tabTitles.account} contents={contents} />
  );
}
