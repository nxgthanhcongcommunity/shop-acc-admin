import CreateModal from "./createModal";

import "react-responsive-pagination/themes/classic.css";
import { Tab } from "../../components";
import { tabTitles } from "../../constants";
import DataTable from "./dataTable";
import { TabContainer } from "../../containers";

export default function Component() {
  const contents = [
    <TabContainer>
      <CreateModal />
      <div className="h-4"></div>
      <DataTable />
    </TabContainer>,
  ];

  return (
    <Tab tabs={tabTitles.banner} contents={contents} />
  );
}
