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
