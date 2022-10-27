import { authAxios } from '../lib/axios/axios.config';
import { endpoints } from '../configs/Apis';

export const buy = async (currentUser, order) =>
  authAxios(currentUser).post(`${endpoints.orders}buy`, order);

export const getOrderUnConfirm = async (currentUser, shopId) =>
  authAxios(currentUser).post(`${endpoints.orders}getOrderUnConfirm`, {
    shopId,
  });

export const confirmOrder = async (currentUser, order) =>
  authAxios(currentUser).post(`${endpoints.orders}confirmOrder`, order);
