import { endpoints } from "../configs/Apis";
import { authAxios, axiosClient } from "../lib/axios/axios.config";

export const addComment = async (currentUser, comment) =>
  await authAxios(currentUser).post(`${endpoints.comments}`, comment);



export const fetchComment = async (productId) =>
  await axiosClient.get(`${endpoints.products}${productId}/comments`);
