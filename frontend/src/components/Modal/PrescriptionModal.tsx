import * as React from "react";
import { Prescription } from '../../interfaces/Interface';
import { requestRenewal } from '../../services/prescriptionService';

type PrescriptionModalProps = {
  prescription: Prescription
};

export default function PrescriptionModal({ prescription }: PrescriptionModalProps) {
  const [showModal, setShowModal] = React.useState(false);
  const [hideRenewal, setHideRenewal] = React.useState<boolean>(prescription.renewalRequest)

  const handleRequest = async () => {
    await requestRenewal(prescription.id)
    setHideRenewal(true)
  }

  return (
    <>
      <button
        className="text-gray-500 font-semibold"
        type="button"
        onClick={() => setShowModal(true)}
      >
        {prescription.drugName}
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="max-w-4xl  bg-white w-full rounded-lg shadow-xl">
              <div className="p-4 border-b">
                <h2 className="text-2xl ">Appointment Information</h2>
                <p className="text-sm text-gray-500">
                  Personal details for your appointment.
                </p>
              </div>
              <div>
                <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                  <p className="text-gray-600">Duration</p>
                  <p>{prescription.duration}</p>
                </div>
                <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                  <p className="text-gray-600">Prescribed Date</p>
                  <p>{prescription.prescribedDate}</p>
                </div>
                <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                  <p className="text-gray-600">Message</p>
                  <p>{prescription.message}</p>
                </div>
                <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                  <p className="text-gray-600">Renewal Request</p>
                  <p>{hideRenewal.toString()}</p>
                </div>
                <div className="flex justify-end">
                  <button
                    className="py-2 px-4 bg-gray-200 rounded-md"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );

}