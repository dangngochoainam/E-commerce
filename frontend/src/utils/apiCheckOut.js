const { endpoints } = require('../configs/Apis');
const { authAxios } = require('../lib/axios/axios.config');

export const payment = async (currentUser, data) =>
  await authAxios(currentUser).post(`${endpoints.checkout}payment`, data);
