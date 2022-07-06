import { useContext } from "react"
import { AuthContext } from ".";

interface IPayload {
  token: string
  id: string
  email: string
  name: string
}

type AuthContextType = {
  id: string;
  name: string;
  email: string;
  crn: string;
  setUserU: (payload: IPayload | null) => void; 
  authenticate: (email: string, password: string) => Promise<boolean>; 
  registrate: (email: string, password: string) => Promise<any>; 
  logout: () => void; 
};

export const useAuth = () => {
  const context = useContext(AuthContext) as AuthContextType;

  return context;
}