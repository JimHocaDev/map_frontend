import React, { createContext, useContext, useState } from "react";

type UserContextProps = {
  user: { name: string; staySigned: boolean };
  setUser: React.Dispatch<
    React.SetStateAction<{ name: string; staySigned: boolean }>
  >;
};

export const UserContext = createContext<UserContextProps>({
  user: { name: "", staySigned: true },
  setUser: () => {},
});

type UserProviderProps = {
  children: React.ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  // const [user, setuser] = useState<boolean>(false);

  const [user, setUser] = useState<{ name: string; staySigned: boolean }>({
    name: "",
    staySigned: false,
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): UserContextProps => useContext(UserContext);
