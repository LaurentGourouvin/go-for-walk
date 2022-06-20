import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://141.94.207.7:8080/',
});

export const axiosInstanceAuth = axios.create({
  baseURL: 'http://141.94.207.7:8080/auth',
});
