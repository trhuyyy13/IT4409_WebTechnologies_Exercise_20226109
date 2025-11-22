import axios from 'axios';
import { API_CONFIG, ENDPOINTS } from '../config/settings';

const httpClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: 12000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor for logging
httpClient.interceptors.request.use(
  (config) => {
    const time = new Date().toLocaleTimeString();
    console.log(`[${time}] 📡 Request: ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('🚫 Request Failed:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for logging
httpClient.interceptors.response.use(
  (response) => {
    const time = new Date().toLocaleTimeString();
    console.log(`[${time}] ✅ Success: ${response.status} from ${response.config.url}`);
    return response;
  },
  (error) => {
    const time = new Date().toLocaleTimeString();
    console.error(`[${time}] ❌ Error:`, error.message);
    return Promise.reject(error);
  }
);

export const userApiService = {
  async fetchAllUsers() {
    try {
      const response = await httpClient.get(ENDPOINTS.USERS);
      return response.data;
    } catch (error) {
      throw new Error(`Lỗi khi tải danh sách: ${error.message}`);
    }
  },

  async fetchUserById(userId) {
    try {
      const response = await httpClient.get(`${ENDPOINTS.USERS}/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Lỗi khi tải chi tiết: ${error.message}`);
    }
  },

  async createNewUser(userData) {
    try {
      const response = await httpClient.post(ENDPOINTS.USERS, userData);
      return response.data;
    } catch (error) {
      throw new Error(`Lỗi khi tạo mới: ${error.message}`);
    }
  },

  async modifyUser(userId, userData) {
    try {
      const response = await httpClient.put(
        `${ENDPOINTS.USERS}/${userId}`,
        userData
      );
      return response.data;
    } catch (error) {
      throw new Error(`Lỗi khi cập nhật: ${error.message}`);
    }
  },

  async removeUser(userId) {
    try {
      await httpClient.delete(`${ENDPOINTS.USERS}/${userId}`);
      return true;
    } catch (error) {
      throw new Error(`Lỗi khi xóa: ${error.message}`);
    }
  },
};

export default userApiService;
