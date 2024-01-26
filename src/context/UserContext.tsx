import React, { createContext, useState, ReactNode } from "react";

export enum Role {
  Client = "client",
  Admin = "admin",
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  telephone?: string;
}

export interface IUserContext {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<IUserContext | null>(null);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext };
