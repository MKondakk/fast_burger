import React, { createContext, useState, ReactNode } from "react";

export interface User {
    id: string;
    name: string;
    email: string;
    role: string; 
    address?: string; 
    telephone?: string; 
  }

interface IUserContext {
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
