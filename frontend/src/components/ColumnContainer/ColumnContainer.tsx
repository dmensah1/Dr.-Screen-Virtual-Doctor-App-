import * as React from "react";
import ColumnItems from "./ColumnItems";

const ColumnContainer = () => {
  return (
    <div className="shadow-lg rounded-2xl bg-white dark:bg-gray-700 w-full md:w-4/12 m-4 ">
      <p className="font-bold text-md p-4 text-black dark:text-white">
        My Tasks
        <span className="text-sm text-gray-500 dark:text-gray-300 dark:text-white ml-2">
          (05)
        </span>
      </p>
      <ul>
        <ColumnItems />
        <ColumnItems />
        <ColumnItems />
        <ColumnItems />
        <ColumnItems />
        <ColumnItems />
        <ColumnItems />
      </ul>
    </div>
  );
};

export default ColumnContainer;
