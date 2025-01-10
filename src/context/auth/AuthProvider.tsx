"use client";

import { loginFn, registerFn } from "@/app/_actions/Auth";
import { AuthResponse, Login, Register } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { AuthContext } from "./AuthContext";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthResponse | null>(null);

  const loginMutation = useMutation<AuthResponse, Error, Login>({
    mutationFn: loginFn,
    onSuccess: (data) => {
      setUser(data);
    },
  });

  const registerMutation = useMutation<AuthResponse, Error, Register>({
    mutationFn: registerFn,
    onSuccess: (data) => {
      setUser(data);
    },
  });

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login: loginMutation,
        register: registerMutation,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
