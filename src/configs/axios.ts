import axios, {isCancel, AxiosError} from 'axios'

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
})

export const headerAPI = {
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
}