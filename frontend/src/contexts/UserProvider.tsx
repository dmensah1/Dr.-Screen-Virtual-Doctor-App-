import * as React from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { INITIAL_USER_DETAILS } from "../interfaces/constants";
import { User, UserContextType } from "../interfaces/Interface";

const UserContext = React.createContext<UserContextType | undefined>(undefined);

type UserProviderProps = {
  children: React.ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const [userDetails, setUserDetails] = useLocalStorage<User>(
    "userDetails",
    INITIAL_USER_DETAILS
  );

  return (
    <UserContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
