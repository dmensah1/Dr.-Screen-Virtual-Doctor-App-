import * as React from "react";
import { SYMPTOMS } from "../../interfaces/constants";
import { Appointment } from "../../interfaces/Interface";

type AppointmentModalProps = {
  appointment: Appointment;
};

export default function AppointmentModal({
  appointment,
}: AppointmentModalProps) {
  const [showModal, setShowModal] = React.useState(false);
  const [symptoms, setSymptoms] = React.useState<string[]>([]);

  React.useEffect(() => {
    const names = [];
    if (appointment.symptoms) {
      for (let i = 0; i < appointment.symptoms.length; i++) {
        if (appointment.symptoms[i] === 1) {
          names.push(SYMPTOMS[i].label);
        }
      }
      setSymptoms(names);
      console.log(symptoms);
    }
  }, [appointment]);

  const getSymptoms = () => {
    let string = "";

    symptoms.forEach((item) => {
      string += item + ", ";
    });

    return string;
  };

  return (
    <>
      <button
        className="text-gray-500 font-semibold"
        type="button"
        onClick={() => setShowModal(true)}
      >
        {appointment.date.toString().slice(0, 10)} {appointment.time}
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
                  <p className="text-gray-600">Doctor name</p>
                  <p>{appointment.doctorName}</p>
                </div>
                <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                  <p className="text-gray-600">Date</p>
                  <p>{appointment.date.toString().slice(0, 10)}</p>
                </div>
                <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                  <p className="text-gray-600">Email Address</p>
                  <p>Janedoe@gmail.com</p>
                </div>
                <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                  <p className="text-gray-600">Symptoms</p>
                  <p>{getSymptoms()}</p>
                </div>
                <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                  <p className="text-gray-600">Note</p>
                  <p>{appointment.note}</p>
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
