import * as React from "react";
import { Paper } from "@material-ui/core";
import { ViewState, AppointmentModel, AppointmentTooltip } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  DayView,
  Appointments,
} from "@devexpress/dx-react-scheduler-material-ui";
import FollowUpTable from "../FollowUpTable/FollowUpTable";
import { getDoctorAppt } from "../../services/appointmentService";
import { Appointment, UserContextType } from "../../interfaces/Interface";
import { useUser } from "../../contexts/UserProvider";

const currentDate = '2021-05-02';

const DoctorContainer = () => {
  const [overviewTab, setOverviewTab] = React.useState(true);
  const [followUpTab, setFollowUpTab] = React.useState(false);
  const [appointments, setAppointments] = React.useState<AppointmentModel[]>([]);
  const [appointmentDetails, setAppointmentDetails] = React.useState<Partial<Appointment[]>>([]);

  const { userDetails, setUserDetails }: UserContextType = useUser();

  const arrayOfAppointmentData = async () => {
    const res = await getDoctorAppt(userDetails.id);
    const appointments: AppointmentModel[] = [];

    for (const item of res) {
      let itemDate = item.date;
      console.log(item)
      if (String(itemDate).slice(0, 10) === '2021-05-02') {
        console.log(item.startTime)
        console.log(item.endTime)
        appointments.push({
          startDate: item.startTime,
          endDate: item.endTime,
          title: `Checkup with ${item.patientId}`,
          id: item.id
        })

        // let details = {
        //   id: item.id,
        //   date: item.date,
        //   symptoms: item.symptoms,
        //   results,
      }
    }

    setAppointments(appointments);
  };

  React.useEffect(() => {
    arrayOfAppointmentData();
    console.log(appointments)
  }, []);


  return (
    <div className="flex flex-col justify-center font-sans">
      <div className="w-full">
        <nav className="flex flex-col sm:flex-row">
          <button
            className={
              "text-gray-600 py-4 px-6 block hover:text-indigo-500 focus:outline-none " +
              (overviewTab
                ? "text-indigo-500 border-b-2 font-medium border-indigo-500 font-sans"
                : "")
            }
            onClick={() => {
              setOverviewTab(true);
              setFollowUpTab(false);
            }}
          >
            Overview
          </button>
          <button
            className={
              "text-gray-600 py-4 px-6 block hover:text-indigo-500 focus:outline-none " +
              (followUpTab
                ? "text-indigo-500 border-b-2 font-medium border-indigo-500 font-sans"
                : "")
            }
            onClick={() => {
              setFollowUpTab(true);
              setOverviewTab(false);
            }}
          >
            Incoming Follow Ups
          </button>
        </nav>
      </div>

      <br />
      {overviewTab && (
        <div className="w-full h-96 flex justify-center px-8">
          <Paper>
            <Scheduler data={appointments}>
              <ViewState currentDate={currentDate} />
              <DayView startDayHour={9.5} endDayHour={17} />
              <Appointments />
            </Scheduler>
          </Paper>
        </div>
      )}

      {followUpTab && (
        <div className="w-11/12 flex justify-center">
          <FollowUpTable />
        </div>
      )}
    </div>
  );
};

export default DoctorContainer;
