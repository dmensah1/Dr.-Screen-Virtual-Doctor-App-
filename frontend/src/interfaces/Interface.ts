export interface User {
  id: string;
  email: string;
  fullName: string;
  birthday?: string;
  isDoctor?: boolean;
  doctorId: string;
}
