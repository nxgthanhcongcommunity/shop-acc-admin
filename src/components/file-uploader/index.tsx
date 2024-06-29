import React, { useState } from "react";
import { CloudIcon } from "../../assets/icons";

const FileUploader = ({
  id,
  fieldName,
  multiple,
  extension,
  onFileSelect,
}: any) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChange = (event: any) => {
    console.log(event.target.files);
    setSelectedFiles(event.target.files);
    if (onFileSelect) {
      onFileSelect(event.target.files);
    }
  };

  return (
    <div>
      <label
        htmlFor="countries"
        className="block mb-2 text-sm font-medium text-gray-900 dark1:text-white"
      >
        {fieldName || "Upload file"}
      </label>
      <label
        htmlFor={id}
        className="flex flex-col items-center justify-center w-full h-64 rounded-lg cursor-pointer bg-gray-50 dark1:hover:bg-bray-800 dark1:bg-gray-700 hover:bg-gray-100 dark1:hover:bg-gray-600"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <CloudIcon />
          {selectedFiles.length > 0 ? (
            [...selectedFiles].map((file) => (
              <p
                key={file.name}
                className="mb-2 text-sm text-gray-500 dark1:text-gray-400"
              >
                <span className="font-semibold">{file.name}</span> {file.size}{" "}
                kB
              </p>
            ))
          ) : (
            <>
              <p className="mb-2 text-sm text-gray-500 dark1:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark1:text-gray-400">
                .{extension}
              </p>
            </>
          )}
        </div>
        <input
          onChange={handleFileChange}
          id={id}
          type="file"
          className="hidden"
          multiple={multiple}
        />
      </label>
    </div>
  );
};

export default FileUploader;
