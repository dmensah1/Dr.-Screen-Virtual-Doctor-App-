export interface User {
  id: string;
  email: string;
  fullName: string;
  birthday: string;
  isDoctor: boolean;
  doctorId: string;
}

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  localId: string;
  expiresIn: string;
  registered?: boolean;
  displayName: string;
}

export interface UserContextType {
  userDetails: User;
  setUserDetails: (userDetails: User) => void;
}

export interface AppointmentRequest {
  date: string;
  doctorId: string;
  patientId: string;
  followUpId: string;
}

export interface AppointmentResponse {
  apptId: string;
}

export interface Doctor {
  id: string;
  isDoctor: boolean;
  fullName: string;
  email: string;
  clinicAddress: string;
  patientIds: String[]
}

export interface Patient {
  id: string;
  email: string;
  fullName: string;
  birthday: string;
  isDoctor: boolean;
  doctorId: string;
}

export interface Appointment {
  date: string;
  doctorId: string;
  followUpId: string;
  id: string;
  patientId: string;
}

export interface FollowUp {
  id: string;
  doctorId: string;
  patientId: string;
  note: string;
  attachmentUrls: string[];
}

export interface Prescription {
  doctorId: string;
  patientId: string;
  drugName: string;
  message: string;
  prescribedDate: string;
  duration: string;
}