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
        className="text-gray-500 font-semibold"
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
{/*             
            <div className="max-w-4xl  bg-white w-full rounded-lg shadow-xl">
        <div className="p-4 border-b">
            <h2 className="text-2xl ">
                Applicant Information
            </h2>
            <p className="text-sm text-gray-500">
                Personal details and application. 
            </p>
        </div>
        <div>
            <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                <p className="text-gray-600">
                    Full name
                </p>
                <p>
                    Jane Doe
                </p>
            </div>
            <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                <p className="text-gray-600">
                    Application for
                </p>
                <p>
                    Product Manager
                </p>
            </div>
            <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                <p className="text-gray-600">
                    Email Address
                </p>
                <p>
                    Janedoe@gmail.com
                </p>
            </div>
            <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                <p className="text-gray-600">
                    Salary
                </p>
                <p>
                    $ 12000
                </p>
            </div>
            <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                <p className="text-gray-600">
                    About
                </p>
                <p>
                    Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu. 
                </p>
            </div>
            <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4">
                <p className="text-gray-600">
                    Attachments
                </p>
                <div className="space-y-2">
                    <div className="border-2 flex items-center p-2 rounded justify-between space-x-2">
                        <div className="space-x-2 truncate">
                            <svg xmlns="http://www.w3.org/2000/svg" className="fill-current inline text-gray-500" width="24" height="24" viewBox="0 0 24 24"><path d="M17 5v12c0 2.757-2.243 5-5 5s-5-2.243-5-5v-12c0-1.654 1.346-3 3-3s3 1.346 3 3v9c0 .551-.449 1-1 1s-1-.449-1-1v-8h-2v8c0 1.657 1.343 3 3 3s3-1.343 3-3v-9c0-2.761-2.239-5-5-5s-5 2.239-5 5v12c0 3.866 3.134 7 7 7s7-3.134 7-7v-12h-2z"/></svg>
                            <span>
                                resume_for_manager.pdf
                            </span>
                        </div>
                        <a href="#" className="text-purple-700 hover:underline">
                            Download
                        </a>
                    </div>

                    <div className="border-2 flex items-center p-2 rounded justify-between space-x-2">
                        <div className="space-x-2 truncate">
                            <svg xmlns="http://www.w3.org/2000/svg" className="fill-current inline text-gray-500" width="24" height="24" viewBox="0 0 24 24"><path d="M17 5v12c0 2.757-2.243 5-5 5s-5-2.243-5-5v-12c0-1.654 1.346-3 3-3s3 1.346 3 3v9c0 .551-.449 1-1 1s-1-.449-1-1v-8h-2v8c0 1.657 1.343 3 3 3s3-1.343 3-3v-9c0-2.761-2.239-5-5-5s-5 2.239-5 5v12c0 3.866 3.134 7 7 7s7-3.134 7-7v-12h-2z"/></svg>
                            <span>
                                resume_for_manager.pdf
                            </span>
                        </div>
                        <a href="#" className="text-purple-700 hover:underline">
                            Download
                        </a>
                    </div>
                </div>
            </div>
        </div> */}
    {/* </div> */} 
            <div className="relative w-9/12 my-6 mx-auto max-w-3xl">

              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">

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

                <div className="relative p-6 flex flex-row min-w-full">

                  <div className="w-3/12 text-blueGray-500 text-lg leading-relaxed text-right font-bold p-1">
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
                  </div>
                </div>

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
          {/* </div> */}
          {/* <div className="opacity-25 fixed inset-0 z-40 bg-black"></div> */}
        </>
      ) : null}
    </>
  );
}

