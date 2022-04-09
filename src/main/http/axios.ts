import { server as config } from '@/infrastructure/config'
import axios, { AxiosRequestConfig } from 'axios'

const http = axios.create({
  baseURL: config.awesomeApiUrl
})

export const request = async ({ url, method, params }: AxiosRequestConfig) => {
  try {
    await http.request({ url, method, params })
  } catch (e) {
    throw e
  }
}
