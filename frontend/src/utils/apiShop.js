import { endpoints } from '../configs/Apis';
import { authAxios, axiosClient } from '../lib/axios/axios.config';

export const fetchProductOfShop = async (shopId, page = 1) => {
  return await axiosClient.get(`${endpoints.shop}${shopId}/products`, {
    params: {
      page: page,
    },
  });
};

export const addProduct = async (currentUser, product) => {
  return await authAxios(currentUser).post(`${endpoints.products}`, product, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const editProduct = async (currentUser, product) => {
  return await authAxios(currentUser).put(
    `${endpoints.products}${product.id}`,
    product,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
};

export const revenueStats = async (currentUser, params) => {
  return await authAxios(currentUser).post(
    `${endpoints.shop}${params.shopId}/stats`,
    { ...params.values }
  );
};

export const fetchShop = async () => await axiosClient.get(`${endpoints.shop}`);
