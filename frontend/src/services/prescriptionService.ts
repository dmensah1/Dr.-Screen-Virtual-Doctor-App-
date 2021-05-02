import axios from 'axios';
import { BACKEND_URL } from '../config/config';
import { Prescription } from '../interfaces/Interface';

const URL = `${BACKEND_URL}/prescriptions`;

export const getUserPrescription: (userId: string) => Promise<Prescription[]> = async (userId: string) => {
  const res: any = await axios.get(`${URL}/forPatient/${userId}`);

  return res.data;
}

export const getPrescription: (prescriptionId: string) => Promise<Prescription> = async (prescriptionId: string) => {
  const res: any = await axios.get(`${URL}/${prescriptionId}`);
  return res.data;
};

export const createUserPrescription = async (prescription: Prescription) => {
  return await axios.post(`${URL}/`, { doctorId: prescription.doctorId, patientId: prescription.patientId, drugName: prescription.drugName, message: prescription.message, prescribedDate: prescription.prescribedDate, duration: prescription.duration })
}

export const deleteUserPrescription = async () => {

};

export const requestRenewal = async (prescriptionId: string) => {
  return await axios.put(`${URL}/renewalReq/${prescriptionId}`);
};

export const resetRenewal = async (prescriptionId: string) => {
  return await axios.put(`${URL}/renewalReset/${prescriptionId}`);
};
