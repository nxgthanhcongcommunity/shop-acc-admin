"use client";

import CreateModal from "./createModal";

import "react-responsive-pagination/themes/classic.css";
import { Tab } from "../../components";
import { tabTitles } from "../../constants";
import DataTable from "./dataTable";
import { TabContainer } from "../../containers";

export default function Category() {
  const contents = [
    <TabContainer>
      <CreateModal />
      <DataTable />
    </TabContainer>,
  ];

  return (
    <Tab tabs={tabTitles.account} contents={contents} />
  );
}
