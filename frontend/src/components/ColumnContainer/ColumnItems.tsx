import React from "react";
import Modal from '../Modal/Modal'

const ColumnItems = () => {
  return (
    <li className="flex items-center text-gray-600 dark:text-gray-200 justify-between py-3 border-b-2 border-gray-100 dark:border-gray-800 hover:bg-gray-100 cursor-pointer">
        <Modal />

      {/* <div className="flex items-center justify-start text-sm">
        <span className="mx-4">01</span>
        <span>Create wireframe</span>
      </div>
      <svg
        width="20"
        height="20"
        fill="currentColor"
        className="mx-4 text-gray-400 dark:text-gray-300"
        viewBox="0 0 1024 1024"
      >
        <path
          d="M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0 0 51.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z"
          fill="currentColor"
        ></path>
        <path
          d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448s448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372s372 166.6 372 372s-166.6 372-372 372z"
          fill="currentColor"
        ></path>
      </svg> */}
    </li>
  );
};

export default ColumnItems;
