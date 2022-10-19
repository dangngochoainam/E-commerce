import { endpoints } from "../configs/Apis";
import { authAxios, axiosClient } from "../lib/axios/axios.config";

export const addReview = async (currentUser, review) =>
  await authAxios(currentUser).post(`${endpoints.reviews}`, review);

export const countRateOfProduct = async (productId) =>
  await axiosClient.get(`${endpoints.reviews}rateOfProduct/${productId}`);

export const fetchReview = async (productId) =>
  await axiosClient.get(`${endpoints.reviews}${productId}`);
