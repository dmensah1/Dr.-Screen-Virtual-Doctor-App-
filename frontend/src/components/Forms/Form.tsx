import * as React from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { useUser } from "../../contexts/UserProvider";
import { UserContextType } from "../../interfaces/Interface";
import { getApptDay } from "../../services/appointmentService";

const Form = () => {
  const [date, setDate] = React.useState<Date[] | Date>();
  const { userDetails}: UserContextType = useUser();
  console.log(date)

  React.useEffect(() => {
    const getAppts = async () => {
      if (date) {
        const appointments = await getApptDay(userDetails.doctorId, date)  
        console.log(appointments)
      }
    };
    getAppts();
  }, [setDate]);

  return (
    <div className="w-full bg-gray-100 py-6 flex flex-col sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto">
            <div className="flex items-center space-x-5">
              <div className="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">
                i
              </div>
              <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                <h2 className="leading-relaxed">Choose a Date</h2>
                <p className="text-sm text-gray-500 font-normal leading-relaxed">
                  Schedule an appointment with your doctor.
                </p>
              </div>
            </div>
            <div className="flex justify-center pt-8">
                <Calendar 
                  className="rounded-md text-m" 
                  calendarType="US" 
                  onChange={setDate} 
                  value={date} 
                />
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Form;
