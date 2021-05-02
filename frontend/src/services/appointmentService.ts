import axios from 'axios';
import { BACKEND_URL } from '../config/config';
import { Appointment, AppointmentRequest } from '../interfaces/Interface';
import { AppointmentModel } from '@devexpress/dx-react-scheduler'

const APPT_URL = `${BACKEND_URL}/appointments`
const PATIENT_URL = `${APPT_URL}/forPatient`;
const DOCTOR_URL = `${APPT_URL}/forDoctor`;

export const getPatientAppt: (userId: string) => Promise<Appointment[]> = async (userId: string) => {
  const res: any = await axios.get(`${PATIENT_URL}/${userId}`);
  return res.data;
};

export const getDoctorAppt = async (userId: string) => {
  const res = await axios.get(`${DOCTOR_URL}/${userId}`);
  return res.data;
};

export const deleteAppt = async (apptId: string) => {
  return await axios.delete(`${APPT_URL}/${apptId}`);
};

export const createAppt = async (details: AppointmentRequest) => {
  return await axios.post(`${APPT_URL}`, details);
};

export const addFollowUp = async (apptId: string) => {
  return await axios.put(`${APPT_URL}/followUp/${apptId}`);
};

export const getApptDay: (doctorId: string, date: Date | Date[]) => Promise<string[]> = async (doctorId: string, date: Date | Date[]) => {
  const res: any = await axios.post(`${APPT_URL}/getForDay/${doctorId}`, { data: date });
  return res.data;
};