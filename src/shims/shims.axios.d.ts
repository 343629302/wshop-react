import { AxiosRequestConfig, AxiosResponse } from 'axios';

declare module 'axios' {
  export interface AxiosRequestConfig {
    requestMark?: string;
  }
  export interface AxiosResponse {
    message?: string;
  }
}
