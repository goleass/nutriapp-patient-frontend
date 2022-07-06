import axios from "axios";
import { getUserLocalStorage, setUserLocalStorage } from "../context/AuthProvider/util";

export const Api = axios.create({
  baseURL: "http://localhost:3333/"
})

Api.interceptors.request.use(
  (config) => {
    const user = getUserLocalStorage()

    const token = `Bearer ${user?.token}`

    config.headers.Authorization = token

    return config
  },
  (error) => { return Promise.reject(error) }
)

Api.interceptors.response.use(
  (data) => { return data },
  (error) => {
    if(error && error.response && error.response.status === 401){
      setUserLocalStorage(null)
    }
    else if (error && error.message === 'Network Error'){
      alert('Problema interno. Tente novamente mais tarde!')
    }
    return Promise.reject(error)
  }
);