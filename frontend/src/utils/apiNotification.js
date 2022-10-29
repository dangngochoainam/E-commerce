import { authAxios } from '../lib/axios/axios.config';
import { endpoints } from '../configs/Apis';

export const getNotification = async (currentUser) =>
  await authAxios(currentUser).get(`${endpoints.notifications}`);

export const createNotification = async (currentUser, data) =>
  authAxios(currentUser).post(`${endpoints.notifications}`, data);
