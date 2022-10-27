import { authAxios } from '../lib/axios/axios.config';
import { endpoints } from '../configs/Apis';

export const stats = async (currentUser, params) =>
  await authAxios(currentUser).post(`${endpoints.admin}stats`, params);
