import axios from 'axios';

const axiosInstance = axios.create({
  timeout: 1000,
});

// Mocking some response behavior if needed, but we'll handle mock logic in services
export default axiosInstance;
