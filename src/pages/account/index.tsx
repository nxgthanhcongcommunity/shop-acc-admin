"use client";

import { useState } from "react";

import { Tab } from "../../components";
import { tabTitles } from "../../constants";
import DataTable from "./data-table";

export default function Component() {
  const [toggleData, setToggleData] = useState(false);

  const contents = [
    (
      <div className="p-12 relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
        <DataTable
          reloadToggle={toggleData}
          setToggleData={setToggleData}
        />
      </div>
    ),
  ]

  return (
    <div className="bg-white dark:bg-gray-900">
      <Tab tabs={tabTitles.account} contents={contents} />
    </div>
  );
}
