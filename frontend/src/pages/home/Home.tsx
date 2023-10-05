import React, { useState } from "react";
import Generator from "../../components/Generator";
import Compressor from "../../components/Compressor";
import Recents from "../../components/Recents";

const Home = () => {
  const [selection, select] = useState("");
  return (
    <div className="dashboard">
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <h1 className="mt-4 mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          {selection === "generate" && <span>Generate Images</span>}
          {selection === "compress" && <span>Compress Images</span>}
          {selection === "recents" && <span>Recent Masterpieces</span>}
        </h1>
        <div className="inline-flex rounded-md shadow-sm">
          <button
            aria-current="page"
            className="px-4 py-2 text-sm font-medium text-blue-700 bg-white 
            border border-gray-200 rounded-l-lg hover:bg-gray-100 focus:z-10 
            focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 
            dark:border-gray-600 dark:text-white dark:hover:text-white 
            dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
            onClick={() => select("generate")}
          >
            Generate
          </button>
          {/* <button
            className="px-4 py-2 text-sm font-medium text-gray-900 bg-white 
            border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 
            focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 
            dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white
            dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
            onClick={() => select("compress")}
          >
            Compress
          </button> */}
          <button
            className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border 
            border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 
            focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 
            dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white 
            dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
            onClick={() => select("recents")}
          >
            Recent
          </button>
        </div>
        {selection === "generate" && <Generator />}
        {/* {selection === "compress" && <Compressor />} */}
        {selection === "recents" && <Recents />}
      </main>
    </div>
  );
}
export default Home;
