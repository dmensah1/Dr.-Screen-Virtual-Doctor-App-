import axios, {AxiosResponse} from 'axios';
import { BACKEND_URL } from '../config/config';
import { Doctor, Patient } from '../interfaces/Interface';

const URL = `${BACKEND_URL}/doctors`;

export const getDoctor: (userId: string) => Promise<AxiosResponse<Doctor>> = async (userId: string) => {
  const res: any = await axios.get(`${URL}/${userId}`);
  return res.doctor;
};

export const addPatientToDoctor = async (doctorId: string, patientId: string) => {
  return await axios.put(`${URL}/addPatient`, {doctorId: doctorId, patientId: patientId});
};

export const getPatients: (doctorId: string) => Promise<Patient[]> = async (doctorId: string) => {
  const res: any = await axios.get(`${URL}/getPatients/${doctorId}`);
  return res.doctorPatients;
};