import axios from 'axios';

const config = {
  BACKEND_API_URL: 'http://139.162.172.245:5000',
  API_CLIENT_TIMEOUT: 16000,
};

const apiClient = axios.create({
  baseURL: config.BACKEND_API_URL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
  timeout: config.API_CLIENT_TIMEOUT,
});

export default apiClient;
