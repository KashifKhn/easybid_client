import { useAuthContext } from "@/context/auth/AuthContext";

export const useAuth = () => {
  const { user, login, register, logout } = useAuthContext();
  return { user, login, register, logout };
};
