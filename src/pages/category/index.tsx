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
  const tabs = [
    {
      title: "Dashboard",
      icon: (actived: any) => (
        <svg
          className={
            actived
              ? "w-4 h-4 me-2 text-blue-600 dark:text-blue-500"
              : "w-4 h-4 me-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
          }
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 18 18"
        >
          <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
        </svg>
      ),
    },
    {
      title: "Import",
      icon: (actived: any) => (
        <svg
          className={
            actived
              ? "w-4 h-4 me-2 text-blue-600 dark:text-blue-500"
              : "w-4 h-4 me-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
          }
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M5 11.424V1a1 1 0 1 0-2 0v10.424a3.228 3.228 0 0 0 0 6.152V19a1 1 0 1 0 2 0v-1.424a3.228 3.228 0 0 0 0-6.152ZM19.25 14.5A3.243 3.243 0 0 0 17 11.424V1a1 1 0 0 0-2 0v10.424a3.227 3.227 0 0 0 0 6.152V19a1 1 0 1 0 2 0v-1.424a3.243 3.243 0 0 0 2.25-3.076Zm-6-9A3.243 3.243 0 0 0 11 2.424V1a1 1 0 0 0-2 0v1.424a3.228 3.228 0 0 0 0 6.152V19a1 1 0 1 0 2 0V8.576A3.243 3.243 0 0 0 13.25 5.5Z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* <Alert /> */}
      <TabTitle
        tabs={tabs}
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
