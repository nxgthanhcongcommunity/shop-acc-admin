"use client";

import axios from "axios";
import { useState } from "react";
import CreateModal from "./create-modal";

import "react-responsive-pagination/themes/classic.css";
import DataTable from "./data-table";
import TabTitle from "./tab-title";
import { CloudIcon } from "../../assets/icons";
import { Button } from "../../components";

export default function Component() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [toggleData, setToggleData] = useState(false);

  const handleFileChange = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = () => {
    if (selectedFile != null) {
      const formData = new FormData();
      formData.append("file", selectedFile, selectedFile.name);

      axios.post("http://localhost:3003/api/v1/banner/upload", formData);
    }
  };

  const [activedTab, setActivedTab] = useState(0);

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* <Alert /> */}
      <TabTitle
        activedTab={activedTab}
        setActivedTab={setActivedTab}
      />
      <ul>
        <li className={activedTab === 0 ? "block" : "hidden"}>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
            <CreateModal setToggleData={setToggleData} />
            <DataTable
              reloadToggle={toggleData}
              setToggleData={setToggleData}
            />
          </div>
        </li>
        <li className={activedTab === 1 ? "block" : "hidden"}>
          <div className="flex items-center justify-center w-full mt-4 flex-col">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <CloudIcon />
                {selectedFile ? (
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">{selectedFile.name}</span>{" "}
                    {selectedFile.size} kB
                  </p>
                ) : (
                  <>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      .xlsx
                    </p>
                  </>
                )}
              </div>
              <input
                onChange={handleFileChange}
                id="dropzone-file"
                type="file"
                className="hidden"
              />
            </label>
            <Button skin="default" onClick={handleFileUpload}>
              Upload
            </Button>
          </div>
        </li>
      </ul>
    </div>
  );
}
