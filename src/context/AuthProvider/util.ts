import { Api } from "../../services/api";

export function setUserLocalStorage(user: { token: string; id: string; email: string; name: string; } | null) {
  localStorage.setItem("u", JSON.stringify(user));
}

export function getUserLocalStorage() {
  const json = localStorage.getItem("u")

  if (!json) {
    return null;
  }

  const user = JSON.parse(json)

  return user ?? null;
}

export async function RegisterRequest(email: string, password: string) {
  try {
    const request = await Api.post('auth-patient/register', { email, password });

    return request.data
  } catch (error) {
    throw error
  }
}

export async function LoginRequest({ email, password }: { email: string; password: string; }): Promise<any> {
  try {
    const request = await Api.post('auth-patient/authenticate', { email, password });

    return request.data
  } catch (error) {
    throw error
  }
}