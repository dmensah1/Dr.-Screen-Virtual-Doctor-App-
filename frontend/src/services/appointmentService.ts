import axios from 'axios';
import { BACKEND_URL } from '../config/config';
import { Appointment, AppointmentRequest } from '../interfaces/Interface';

const APPT_URL = `${BACKEND_URL}/appointments`
const PATIENT_URL = `${APPT_URL}/forPatient`;
const DOCTOR_URL = `${APPT_URL}/forDoctor`;

export const getPatientAppt = async (userId: string) => {
  return await axios.get(`${PATIENT_URL}/${userId}`);
};

export const getDoctorAppt = async (userId: string) => {
  return await axios.get(`${DOCTOR_URL}/${userId}`);
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

export const getApptDay: (doctorId: string, date: Date | Date[]) => Promise<Appointment[]> = async (doctorId: string, date: Date | Date[]) => {
  const req = {
    date: date
  }
  const res: any = await axios.get(`${APPT_URL}/getForDay/${doctorId}`, {data: req});
  return res;
};