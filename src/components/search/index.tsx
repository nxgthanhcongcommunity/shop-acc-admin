import { useState } from "react";
import { MicIcon } from "../../assets/icons";

const Search = ({ onTextChange }: any) => {
  const [text, setText] = useState("");

  const handleSearchChange = (e: any) => {
    setText(e.target.value);
    onTextChange(e.target.value);
  };

  return (
    <div className="flex items-center w-[30%] mb-4">
      <label htmlFor="voice-search" className="sr-only">
        Search
      </label>
      <div className="relative w-full">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark1:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 21 21"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11.15 5.6h.01m3.337 1.913h.01m-6.979 0h.01M5.541 11h.01M15 15h2.706a1.957 1.957 0 0 0 1.883-1.325A9 9 0 1 0 2.043 11.89 9.1 9.1 0 0 0 7.2 19.1a8.62 8.62 0 0 0 3.769.9A2.013 2.013 0 0 0 13 18v-.857A2.034 2.034 0 0 1 15 15Z"
            />
          </svg>
        </div>
        <input
          value={text}
          onChange={handleSearchChange}
          type="text"
          id="voice-search"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark1:bg-gray-700 dark1:border-gray-600 dark1:placeholder-gray-400 dark1:text-white dark1:focus:ring-blue-500 dark1:focus:border-blue-500"
          placeholder="Search Mockups, Logos, Design Templates..."
          required
        />
        <button
          type="button"
          className="absolute inset-y-0 end-0 flex items-center pe-3"
        >
          <MicIcon />
        </button>
      </div>
    </div>
  );
};

export default Search;
