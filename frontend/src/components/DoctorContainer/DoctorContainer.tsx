import * as React from "react";
import { Paper } from "@material-ui/core";
import { ViewState, AppointmentModel } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  DayView,
  Appointments,
  AppointmentTooltip,
} from "@devexpress/dx-react-scheduler-material-ui";
import FollowUpTable from "../FollowUpTable/FollowUpTable";
import { getDoctorAppt } from "../../services/appointmentService";
import { getDoctorFollowUps } from "../../services/followUpService";
import { Appointment, UserContextType, FollowUp } from "../../interfaces/Interface";
import { useUser } from "../../contexts/UserProvider";
import DoctorAppointmentModal from "../Modal/DoctorAppointmentModal";

const currentDate = "2021-05-02";

const DoctorContainer = () => {
  const [overviewTab, setOverviewTab] = React.useState(true);
  const [followUpTab, setFollowUpTab] = React.useState(false);
  const [appointments, setAppointments] = React.useState<AppointmentModel[]>([]);
  const [followUps, setFollowUps] = React.useState<FollowUp[]>([])
  const [data, setData] = React.useState<Appointment[]>([]);

  const { userDetails, setUserDetails }: UserContextType = useUser();

  const getFollowUps = async () => {
    const res = await getDoctorFollowUps(userDetails.id);
    setFollowUps(res)
  }

  const arrayOfAppointmentData = async () => {
    const res = await getDoctorAppt(userDetails.id);

    // console.log(res);
    const appointments: AppointmentModel[] = [];
    const data: Appointment[] = [];

    for (const item of res) {
      let itemDate = item.date;
      if (String(itemDate).slice(0, 10) === "2021-05-02") {
        data.push(item);
        appointments.push({
          startDate: item.startTime,
          endDate: item.endTime,
          title: `Checkup with ${item.patientName}`,
          results: item.results,
          patientId: item.patientId,
          id: item.id,
          symptoms: item.symptoms,
          note: item.note
        });
      }
    }

    setAppointments(appointments);
    setData(data);
  };

  React.useEffect(() => {
    arrayOfAppointmentData();
    getFollowUps();
  }, []);

  const findAppointmentById = (id: any) => {
    let string = Object.values(id);
    let res = '';

    string.forEach(char => {
      res += char;
    });

    console.log(res);
    let result: Appointment = {
      id: '',
      date: new Date(),
      doctorId: '',
      doctorName: '',
      followUpId: '',
      patientId: '',
      symptoms: [],
      results: [],
      note: '',
      time: new Date(),
      startTime: '',
      endTime: '',
      patientName: ''
    };

    data.forEach(item => {
      console.log(item.id === res)
      if (item.id === res) {
        result = item;
      }
    });

    return result;
  }

  const Content = ({ ...restProps }) => {
    let id = { ...restProps.appointmentData.id };

    let copyId = { ...id };

    // console.log(copyId)
    const appt: Appointment = findAppointmentById(copyId);

    return (
      <AppointmentTooltip.Content
        formatDate={() => ""}
        recurringIconComponent={DoctorContainer}
        {...restProps}
      >
        <DoctorAppointmentModal appointment={appt} />
      </AppointmentTooltip.Content>
    );
  };


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
        <div className="w-full flex justify-center px-8">
          <Paper>
            <Scheduler data={appointments}>
              <ViewState currentDate={currentDate} />
              <DayView startDayHour={9.5} endDayHour={17} />
              <Appointments />
              <AppointmentTooltip contentComponent={Content} />
            </Scheduler>
          </Paper>
        </div>
      )}

      {followUpTab && (
        <div className="w-11/12 flex justify-center">
          <FollowUpTable followUps={followUps} />
        </div>
      )}
    </div>
  );
};

export default DoctorContainer;
