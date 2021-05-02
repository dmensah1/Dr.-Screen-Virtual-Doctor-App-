import * as React from "react";
import {
  Appointment,
  FollowUp,
  Prescription,
} from "../../interfaces/Interface";
import Modal from "../Modal/Modal";
import AppointmentModal from "../Modal/AppointmentModal";
import PrescriptionModal from '../Modal/PrescriptionModal';
import FollowUpModal from '../Modal/FollowUpModal';

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
    <>
      <div className="shadow-lg rounded-2xl bg-white dark:bg-gray-700 w-full md:w-3/12">
        <div className="flex justify-center">
          <p className="font-bold text-s p-4 text-black dark:text-white">
            Upcoming Appointments
          <span className="text-sm text-gray-500 dark:text-gray-300 dark:text-white ml-2">
              ({appointments.length})
          </span>
          </p>

        </div>
        <ul>
          {appointments.map((item, index) => {
            return (
              <li className="flex items-center text-gray-600 dark:text-gray-200 justify-center py-3 border-b-2 border-gray-100 dark:border-gray-800 hover:bg-gray-100 cursor-pointer">
                <AppointmentModal appointment={item} />
              </li>
            );
          })}
        </ul>
      </div>

      <div className="shadow-lg rounded-2xl bg-white dark:bg-gray-700 w-full md:w-3/12">
        <div className="flex justify-center">
          <p className="font-bold text-md p-4 text-black dark:text-white">
            Follow Ups
          <span className="text-sm text-gray-500 dark:text-gray-300 dark:text-white ml-2">
              ({followUps.length})
          </span>
          </p>
        </div>
        <ul>
          {followUps.map((item, index) => {
            return (
              <li className="flex items-center text-gray-600 dark:text-gray-200 justify-center py-3 border-b-2 border-gray-100 dark:border-gray-800 hover:bg-gray-100 cursor-pointer">
                <FollowUpModal followUp={item} />
              </li>
            );
          })}
        </ul>
      </div>

      <div className="shadow-lg rounded-2xl bg-white dark:bg-gray-700 w-full md:w-3/12">
        <div className="flex justify-center">
          <p className="font-bold text-md p-4 text-black dark:text-white">
            Prescriptions
          <span className="text-sm text-gray-500 dark:text-gray-300 dark:text-white ml-2">
              ({prescriptions.length})
          </span>
          </p>
        </div>
        <ul>
          {prescriptions.map((item, index) => {
            return (
              <li className="flex items-center text-gray-600 dark:text-gray-200 justify-center py-3 border-b-2 border-gray-100 dark:border-gray-800 hover:bg-gray-100 cursor-pointer">
                <PrescriptionModal prescription={item} />
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default ColumnContainer;
