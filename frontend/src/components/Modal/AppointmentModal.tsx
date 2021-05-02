import * as React from "react";
import { SYMPTOMS } from '../../interfaces/constants';
import { Appointment } from '../../interfaces/Interface';

type AppointmentModalProps = {
  appointment: Appointment
}

export default function AppointmentModal({ appointment }: AppointmentModalProps) {
  const [showModal, setShowModal] = React.useState(false);
  const [symptoms, setSymptoms] = React.useState<string[]>([])

  React.useEffect(() => {
    const names = [];
    if (appointment.symptoms) {
      for (let i = 0; i < appointment.symptoms.length; i++) {
        if (appointment.symptoms[i] === 1) {
          names.push(SYMPTOMS[i].label)
        }
      }
      setSymptoms(names);
      console.log(symptoms)
    }
  }, [appointment])

  return (
    <>
      <button
        className="bg-indigo-400 rounded-md w-60 text-white active:bg-pink-600 text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        {appointment.date.toString().slice(0, 10)}  {appointment.time}
      </button>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-9/12 my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    {appointment.doctorName}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex flex-row min-w-full">
                  <ul className="list-disc">
                    Test
                    <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit</li>
                  </ul>
                  {/* <div className="w-3/12 text-blueGray-500 text-lg leading-relaxed text-right font-bold p-1">
                    <p>
                      Date
                    </p>
                    <p>
                      Time
                    </p>
                    <p>
                      Note
                    </p>
                    <p>
                      Symptoms
                    </p>
                  </div>
                  <div className="w-9/12 p-1 text-blueGray-500 text-lg leading-relaxed">
                    <p>
                      {appointment.date.toString().slice(0, 10)}
                    </p>
                    <p>
                      {appointment.time}
                    </p>
                    <p>
                      {appointment.note}
                    </p>
                    <p>
                      {symptoms.map((item) => (
                        <>
                          {`${item}, `}
                        </>
                      ))}
                    </p>
                  </div> */}
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="bg-emerald-500 text-black active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

