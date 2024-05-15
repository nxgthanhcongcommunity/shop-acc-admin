"use client";

import CreateModal from "./create-modal";

import "react-responsive-pagination/themes/classic.css";
import { Tab } from "../../components";
import { tabTitles } from "../../constants";
import DataTable from "./data-table";

export default function Component() {

  const contents = [(
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
      <CreateModal />
      <DataTable />
    </div>
  )]

  return (
    <div className="bg-white dark:bg-gray-900">
      <Tab tabs={tabTitles.banner} contents={contents} />
    </div>
  );
}
