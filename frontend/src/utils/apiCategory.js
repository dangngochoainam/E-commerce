import { endpoints } from "../configs/Apis";
import { axiosClient } from "../lib/axios/axios.config";

export const fetchCategory = async () => {
  return await axiosClient.get(`${endpoints.categories}`);
};

export const fetchSubCategory = async () => {
    return await axiosClient.get(`${endpoints.categories}`);

}
