import React from 'react'
import Sidebar from '../components/Sidebar/Sidebar'
import { useUser } from '../contexts/UserProvider';
import { Patient, UserContextType } from '../interfaces/Interface';
import { getPatients } from '../services/doctorService';

const Patients = () => {
  const { userDetails }: UserContextType = useUser()
  const [patients, setPatients] = React.useState<Patient[]>([]);

  React.useEffect(() => {
    const getAllPatients = async () => {
      const res = await getPatients(userDetails.id);
      setPatients(res)
      console.log(res)
    };
    getAllPatients()
  }, [])

  return (
    <>
      <main className='flex'>

        <Sidebar />
        <div className="w-full">
          <div className="min-w-screen min-h-screen bg-gray-100 flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
            <div className="w-full lg:w-5/6">
              <div className="bg-white shadow-md rounded my-6">
                <table className="min-w-max w-full table-auto">
                  <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                      <th className="py-3 px-6 text-left">Patient</th>
                      <th className="py-3 px-6 text-left">Email</th>
                      <th className="py-3 px-6 text-left">Birthday</th>
                      <th className="py-3 px-6 text-left">Doctor</th>
                      <th className="py-3 px-6 text-center"></th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 text-sm font-light">
                    {patients.map((patient) => (
                      <>
                        <tr className="border-b border-gray-200 hover:bg-gray-100">
                          <td className="py-3 px-6 text-left">
                            <div className="flex items-center">
                              <span>{patient.fullName}</span>
                            </div>
                          </td>
                          <td className="py-3 px-6 text-left">
                            <div className="flex items-center">
                              <span>{patient.email}</span>
                            </div>
                          </td>
                          <td className="py-3 px-6 text-right">
                            <div className="flex items-right">
                              <span>{patient.birthday}</span>
                            </div>
                          </td>
                          <td className="py-3 px-6 text-left">
                            <div className="flex items-center">
                              <span>Dr. Dayrit</span>
                            </div>
                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>

  )
}

export default Patients
