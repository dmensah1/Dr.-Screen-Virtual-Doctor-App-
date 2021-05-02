import axios from 'axios';
import { BACKEND_URL } from '../config/config';
import { FollowUp } from '../interfaces/Interface';

const URL = `${BACKEND_URL}/followups`;

export const createFollowUp: (details: Partial<FollowUp>) => Promise<{ followUp: string }> = async (details: Partial<FollowUp>) => {
  const res: any = await axios.post(URL, details);
  return res;
};

export const getFollowUp: (id: string) => Promise<FollowUp> = async (id: string) => {
  const res: any = await axios.get(`${URL}/${id}`);
  return res;
};

export const getDoctorFollowUps: (doctorId: string) => Promise<FollowUp> = async (doctorId: string) => {
  const res: any = await axios.get(`${URL}/forDoctor/${doctorId}`);
  return res;
};

export const getPatientFollowUps: (patientId: string) => Promise<FollowUp[]> = async (patientId: string) => {
  const res: any = await axios.get(`${URL}/forPatient/${patientId}`);
  return res.data.data;
};

export const deleteFollowUp = async (followUpId: string) => {
  return await axios.delete(`${URL}/${followUpId}`);
};