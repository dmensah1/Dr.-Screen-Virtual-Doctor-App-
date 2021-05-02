import * as React from 'react'
import DoctorContainer from "../components/DoctorContainer/DoctorContainer";
import Sidebar from "../components/Sidebar/Sidebar"
import { useUser } from "../contexts/UserProvider";
import { UserContextType, Appointment, FollowUp, Prescription } from "../interfaces/Interface";
import { getPatientAppt } from '../services/appointmentService'
import PatientContainer from '../components/PatientContainer/PatientContainer'
import { getUserPrescription } from '../services/prescriptionService';
import { getPatientFollowUps } from '../services/followUpService';

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
    };

    const getPrescriptions = async () => {
      const res = await getUserPrescription(userDetails.id);
      console.log(res)
      console.log(userDetails.id)
      setPrescription(res)
      console.log(prescription)
    };

    const getFollowUps = async () => {
      const res = await getPatientFollowUps(userDetails.id);
      setFollowUps(res)
    }

    getFollowUps();
    getAppointments();
    getPrescriptions()
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
