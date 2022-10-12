import { endpoints } from "../configs/Apis";
import { authAxios, axiosClient } from "../lib/axios/axios.config";

export const fetchProductOfShop = async (shopId, page = 1) => {
  return await axiosClient.get(`${endpoints.shop}${shopId}/products`, {
    params: {
      page: page
    },
  });
};

export const addProduct = async (currentUser, product) => {
  return await authAxios(currentUser).post(`${endpoints.products}`, product, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
