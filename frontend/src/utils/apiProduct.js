import { endpoints } from '../configs/Apis';
import { axiosClient } from '../lib/axios/axios.config';

export const compareProduct = async (productId1, productId2) =>
  axiosClient.post(`${endpoints.products}compare`, {
    productId1,
    productId2,
  });

export const getProductByID = async (productID) =>
  axiosClient.get(`${endpoints.products}${productID}`);
