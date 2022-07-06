import React, { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getUserLocalStorage, LoginRequest, RegisterRequest, setUserLocalStorage } from "./util";

interface IPayload {
  token: string
  id: string
  email: string
  name: string
}

type AuthContextType = {
  setUserU: (payload: IPayload) => void; 
  authenticate: (email: string, password: string) => Promise<boolean>; 
  registrate: (name: string, email: string, password: string) => Promise<any>; 
  logout: () => void; 
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: any }) => {

  const location = useLocation()

  const [user, setUser] = useState<IPayload | null>(null);

  useEffect(() => {
    const user = getUserLocalStorage()

    if (user) {
      setUser(user)
    }

  }, [])

  useEffect(() => {
    const user = getUserLocalStorage()

    setUser(user)

  }, [location.pathname])

  async function authenticate(email: string, password: string): Promise<boolean> {
    try {
      const response = await LoginRequest({ email, password });

      const payload = { token: response.token, id: response.user.id, email: email, name: response.user.name };

      setUser(payload);
      setUserLocalStorage(payload);

      return true
    } catch (error) {
      throw error
    }
  }

  const setUserU = (payload: IPayload) => {
    setUser(payload);
    setUserLocalStorage(payload);
  }

  async function registrate(email: string, password: string): Promise<any> {
    const response = await RegisterRequest(email, password)

    if (response && response.error)
      return response

    const payload = { token: response.token, id: response.user.id, email: email, name: response.user.name }

    setUser(payload)
    setUserLocalStorage(payload)

    return payload
  }

  async function logout() {
    setUser(null);
    setUserLocalStorage(null);
  }

  return (
    <AuthContext.Provider value={{ ...user, setUserU, authenticate, registrate, logout }}>
      {children}
    </AuthContext.Provider>
  )
};