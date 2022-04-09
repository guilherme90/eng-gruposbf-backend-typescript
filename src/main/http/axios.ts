import { server as config } from '@/infrastructure/config'
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

export class RequestApi<T> {
  private readonly client: AxiosInstance
  constructor (axiosConfig: AxiosRequestConfig = {}) {
    this.client = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL ?? config.awesomeApiUrl
    })
  }

  async handle ({ url, method, params }: AxiosRequestConfig): Promise<T> {
    try {
      const { data } = await this.client.request({ url, method, params })
      return data
    } catch (e) {
      throw e
    }
  }
}
