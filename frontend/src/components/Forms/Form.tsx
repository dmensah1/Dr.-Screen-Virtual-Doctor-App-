import * as React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useUser } from "../../contexts/UserProvider";
import {
  AppointmentRequest,
  UserContextType,
} from "../../interfaces/Interface";
import { createAppt, getApptDay } from "../../services/appointmentService";
import Select from "react-select";
import { SYMPTOMS } from "../../interfaces/constants";
import makeAnimated from "react-select/animated";

const Form = () => {
  const [date, setDate] = React.useState<Date[] | Date>();
  const [time, setTime] = React.useState<Date[] | Date>();
  const [symptoms, setSymptoms] = React.useState<any>([]);
  const [note, setNote] = React.useState("");
  const { userDetails }: UserContextType = useUser();
  const [schedule, setSchedule] = React.useState(true);
  const [daySchedule, setDaySchedule] = React.useState(false);


  const animatedComponents = makeAnimated();

  const handleInput = async () => {
    const arrayOfSymptomValues: string[] = [];

    symptoms?.forEach((symptom: { value: string }) => {
      arrayOfSymptomValues.push(symptom.value);
    });

    const apptDetails: AppointmentRequest = {
      date: date,
      doctorId: userDetails.doctorId,
      patientId: userDetails.id,
      symptoms: arrayOfSymptomValues,
      doctorName: userDetails.doctorName,
      note: note,
      time: time
    };

    console.log(apptDetails);

    // res == apptID
    const res = await createAppt(apptDetails);
    if (res) {
      console.log(res);
    }
  };

  const submitTime = () => {
    setSchedule(!schedule);
  };

  React.useEffect(() => {
    console.log(date);
    const getAppts = async () => {
      if (date) {
        const appointments = await getApptDay(userDetails.doctorId, date);
        console.log(appointments);
        setDaySchedule(true);
      }
    };
    getAppts();
    // eslint-disable-next-line
  }, [date]);

  return (
    <div className="w-full bg-gray-100 py-6 flex flex-col sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto w-full">
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto">
            <div className="flex items-center space-x-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-14 w-14"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                <h2 className="leading-relaxed">Schedule an Appointment</h2>
                <p className="text-sm text-gray-500 font-normal leading-relaxed">
                  Fill out the following details to schedule an appointment.
                </p>
              </div>
            </div>
            {schedule && (
              <>
                {!daySchedule ? (
                  <div className="flex justify-center py-8">
                    <Calendar
                      className="rounded-md text-m"
                      calendarType="US"
                      onChange={setDate}
                      value={date}
                    />
                  </div>
                ) : (
                  <>
                  {/* <div className="w-full items-center p-8">
                <div className="mb-4 mx-0 sm:ml-4 xl:mr-4">
                    <div className="shadow-lg rounded-2xl bg-white dark:bg-gray-700 w-full">
                        <p className="font-bold text-md p-4 text-black dark:text-white">
                            My Tasks
                            <span className="text-sm text-gray-500 dark:text-gray-300 dark:text-white ml-2">
                              (05)
                            </span>
                        </p>
                        <ul>
                        <li className="flex items-center text-gray-600 dark:text-gray-200 justify-between py-3 border-b-2 border-gray-100 dark:border-gray-800 hover:bg-gray-100">
                        <div className="flex items-center justify-start text-sm" new Date()>
                            <span className="mx-4">1</span>
                            <span>11:30am</span>
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
                        </svg>
                    </li>
                        </ul>
                    </div>
                </div>
                </div> */}
                      <div>
                      <div className="w-full max-w-screen-xl mx-auto px-6">
                        <div className="flex justify-center p-4 px-3 py-10">
                            <div className="w-full max-w-md">
                                <div className="px-3 py-2 mb-4">
                                    <div className="block text-gray-700 text-lg font-semibold py-2 px-2">
                                        Available Times
                                    </div>
                                    <div className="py-3 text-sm">
                                        <div className="flex justify-start cursor-pointer text-gray-700 hover:text-blue-400 hover:bg-blue-100 rounded-md px-2 py-2 my-2">
                                        <span className="bg-green-400 h-2 w-2 m-2 rounded-full"></span>
                                            <div className="flex-grow font-medium px-2">11:30am</div>
                                            <div className="text-sm font-normal text-gray-500 tracking-wide">Dr. Dayrit</div>
                                        </div>
                                        <div className="flex justify-start cursor-pointer text-gray-700 hover:text-blue-400 hover:bg-blue-100 rounded-md px-2 py-2 my-2">
                                            <span className="bg-green-400 h-2 w-2 m-2 rounded-full"></span>
                                            <div className="flex-grow font-medium px-2">1:30pm</div>
                                            <div className="text-sm font-normal text-gray-500 tracking-wide">Dr. Dayrit</div>
                                        </div>
                                        <div 
                                          className="flex justify-start cursor-pointer text-gray-700 hover:text-blue-400 hover:bg-blue-100 rounded-md px-2 py-2 my-2"
                                          // onClick={e => setTime(e.target.value)}
                                        >
                                            <span className="bg-green-400 h-2 w-2 m-2 rounded-full"></span>
                                            <div className="flex-grow font-medium px-2">3:00pm</div>
                                            <div className="text-sm font-normal text-gray-500 tracking-wide">Dr. Dayrit</div>
                                        </div>
                                    </div>
                                    <div className="block bg-gray-200 text-sm text-right py-2 px-3 -mx-3 -mb-2 rounded-b-lg">
                                        <button className="hover:text-gray-600 text-gray-500 font-bold py-2 px-4" onClick={() => setDaySchedule(!daySchedule)}>
                                            Back
                                        </button>
                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={submitTime}>
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                      </div>
                  </>
                )}
              </>
            )}
            {!schedule && (
              <div className="pt-4">
                <Select
                  isMulti
                  closeMenuOnSelect={false}
                  options={SYMPTOMS}
                  components={animatedComponents}
                  placeholder="Type and select your symptoms"
                  onChange={(e) => setSymptoms(e)}
                />

                <br />

                <textarea
                  className="form-textarea mt-1 block w-full border focus:ring-gray-500 focus:border-gray-900 w-full border-gray-300 rounded-md focus:outline-none text-gray-600 text-sm p-2"
                  placeholder="Leave additional comments for your doctor."
                  onChange={(e) => setNote(e.target.value)}
                  rows={6}
                ></textarea>

                <div className="pt-4">
                  
                  <button
                    className="px-3 py-2 bg-indigo-200 rounded-full"
                    onClick={() => {
                        setSchedule(true)
                        setDaySchedule(true)
                    }}
                  >
                    Back
                  </button>
                  <button
                    className="px-3 py-2 bg-indigo-200 rounded-full"
                    onClick={() => handleInput()}
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
