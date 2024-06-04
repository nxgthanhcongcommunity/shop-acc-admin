"use client";

import CreateModal from "./createModal";

import "react-responsive-pagination/themes/classic.css";
import { Tab } from "../../components";
import { tabTitles } from "../../constants";
import DataTable from "./dataTable";

export default function Category() {
  const contents = [
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
      <CreateModal />
      <DataTable />
    </div>,
  ];

  return (
    <div className="bg-white dark:bg-gray-900">
      <Tab tabs={tabTitles.banner} contents={contents} />
    </div>
  );
}
