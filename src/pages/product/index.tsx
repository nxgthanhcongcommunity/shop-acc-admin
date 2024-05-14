"use client";

import axios from "axios";
import { useState } from "react";
import CreateModal from "./create-modal";

import "react-responsive-pagination/themes/classic.css";
import DataTable from "./data-table";
import TabTitle from "./tab-title";
import { CloudIcon } from "../../assets/icons";
import { Button } from "../../components";
import UploadImage from "./upload-image";
import { wait } from "@testing-library/user-event/dist/utils";
import productApi from "../../api/productApi";

export default function Component() {
  const [productChildFiles, setProductChildFiles] = useState<File[] | null>(null);
  const [productMainFile, setProductMainFile] = useState<File | null>(null);

  const [toggleData, setToggleData] = useState(false);

  const handleProductChildFilesChange = (event: any) => {
    setProductChildFiles(event.target.files);
  };

  const handleProductMainFileChange = (event: any) => {
    setProductMainFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    const formData = new FormData();

    if (productChildFiles != null) {
      [...productChildFiles].forEach((file, index) => {
        formData.append(`child-files`, file, file.name);
      });
    }

    if (productMainFile != null) {
      formData.append(`main-file`, productMainFile, productMainFile.name);
    }


    // axios.post("http://localhost:3003/cool-profile", formData);
    await productApi.AddProduct(formData);

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
              htmlFor="dropzone-child-files"
              className="flex flex-col items-center justify-center w-full h-64 rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              <input
                onChange={handleProductChildFilesChange}
                id="dropzone-child-files"
                type="file"
                multiple
              />
            </label>
            <Button skin="default" onClick={handleFileUpload}>
              Upload
            </Button>
          </div>
          <div className="flex items-center justify-center w-full mt-4 flex-col">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              <input
                onChange={handleProductMainFileChange}
                id="dropzone-file"
                type="file"
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
