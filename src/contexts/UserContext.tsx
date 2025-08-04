import React, { createContext, useContext, useEffect, useState } from "react";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profileImage?: string;
};

type UserContextType = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (user: User) => void;
  loading: boolean;
};

const UserContext = createContext<UserContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  updateUser: () => {},
  loading: true,
});

export const useUser = () => useContext(UserContext);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (user: User) => {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null);
  };

  const updateUser = (updatedUser: User) => {
    localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  return (
    <UserContext.Provider value={{ user, login, logout, updateUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};
