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