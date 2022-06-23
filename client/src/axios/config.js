import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://141.94.207.7:8080/api',
});

export default axiosInstance;
