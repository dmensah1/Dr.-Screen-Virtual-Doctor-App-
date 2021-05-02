import * as React from 'react'
import DoctorContainer from "../components/DoctorContainer/DoctorContainer";
import Sidebar from "../components/Sidebar/Sidebar"
import { useUser } from "../contexts/UserProvider";
import { UserContextType, Appointment, FollowUp, Prescription } from "../interfaces/Interface";
import { getPatientAppt } from '../services/appointmentService'
import PatientContainer from '../components/PatientContainer/PatientContainer'

const Home = () => {
  const { userDetails }: UserContextType = useUser();
  const [appointments, setAppointments] = React.useState<Appointment[]>([]);
  const [followUps, setFollowUps] = React.useState<FollowUp[]>([]);
  const [prescription, setPrescription] = React.useState<Prescription[]>([]);

  // fetch appointments on load
  React.useEffect(() => {
    const getAppointments = async () => {
      const res = await getPatientAppt(userDetails.id);

      setAppointments(res);
      console.log(appointments)
    }

    getAppointments();
  }, []);

  console.log(appointments)

  return (
    <main className="flex">
      <Sidebar />

      <div className="w-10/12">
          {userDetails.isDoctor ? (
            <>
            <DoctorContainer />
              {/* <ColumnContainer /> */}
              {/* <DoctorContainer /> */}
            </>
          ) : (
            <>
        <div className="flex flex-col md:flex-row p-8 justify-around">

              <PatientContainer appointments={appointments} followUps={followUps} prescriptions={prescription}/>
              {/* <ColumnContainer />
              <ColumnContainer /> */}
      </div>

            </>
          )}
        </div>


    </main>
  );
};

export default Home;
