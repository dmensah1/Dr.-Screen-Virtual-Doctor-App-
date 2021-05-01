import * as React from "react";
import {
  Appointment,
  FollowUp,
  Prescription,
} from "../../interfaces/Interface";
import Modal from '../Modal/Modal'


type ColumnContainerProps = {
  appointments: Appointment[];
  followUps: FollowUp[];
  prescriptions: Prescription[];
};

const ColumnContainer = ({
  appointments,
  followUps,
  prescriptions,
}: ColumnContainerProps) => {
  return (
    <div className="shadow-lg rounded-2xl bg-white dark:bg-gray-700 w-full md:w-3/12">
      <p className="font-bold text-md p-4 text-black dark:text-white">
        My Tasks
        <span className="text-sm text-gray-500 dark:text-gray-300 dark:text-white ml-2">
          (05)
        </span>
      </p>
      <ul>
        <li className="flex items-center text-gray-600 dark:text-gray-200 justify-between py-3 border-b-2 border-gray-100 dark:border-gray-800 hover:bg-gray-100 cursor-pointer">
          <Modal />
        </li>
      </ul>
    </div>
  );
};

export default ColumnContainer;
