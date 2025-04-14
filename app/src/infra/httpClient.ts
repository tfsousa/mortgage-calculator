import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export class HttpClient<P = any, R = any> {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string = 'http://localhost:3001') {
    this.axiosInstance = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
  }

  async request(config: AxiosRequestConfig): Promise<AxiosResponse<R>> {
    return this.axiosInstance.request<R>(config);
  }

  async get(url: string, config?: AxiosRequestConfig): Promise<R> {
    const response = await this.axiosInstance.get<R>(url, config);
    return response.data;
  }

  async post(url: string, data?: P, config?: AxiosRequestConfig): Promise<R> {
    const response = await this.axiosInstance.post<R>(url, data, config);
    return response.data;
  }
}

export const httpClient = new HttpClient();
