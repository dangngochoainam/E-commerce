import { endpoints } from '../configs/Apis';
import { authAxios, axiosClient } from '../lib/axios/axios.config';

export const compareProduct = async (productId1, productId2) =>
  axiosClient.post(`${endpoints.products}compare`, {
    productId1,
    productId2,
  });

export const getProductByID = async (productID) =>
  axiosClient.get(`${endpoints.products}${productID}`);

export const deleteProduct = async (currentUser, productId) =>
  authAxios(currentUser).delete(`${endpoints.products}${productId}}`);

export const getUserByProductID = async (productID) =>
  axiosClient.get(`${endpoints.users}ofProduct/${productID}`);
