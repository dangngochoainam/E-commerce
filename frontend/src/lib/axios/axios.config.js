import axios from "axios";
import queryString from "query-string";
import jwt_decode from "jwt-decode";

export const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,

  // Không sử dụng được khi upload ảnh.
  // Fix sau
  // headers: {
  //   "content-type": "application/json",
  // },
  paramsSerializer: (params) => queryString.stringify(params),
});
axiosClient.interceptors.request.use(async (config) => {
  return config;
});
axiosClient.interceptors.response.use(
  async (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (err) => {
    throw err;
  }
);

const refreshToken = async () => {
  try {
    const res = await axiosClient.post("/refreshToken", {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const authAxios = (currentUser) => {
  const newInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    // headers: {
    //   "content-type": "application/json",
    // },
    paramsSerializer: (params) => queryString.stringify(params),
  });

  newInstance.interceptors.request.use(
    async (config) => {
      if (currentUser?.accessToken) {
        config.headers["token"] = `Bearer ${currentUser.accessToken}`;
      }

      // const decodedToken = jwt_decode(user?.accessToken);
      // if (decodedToken.exp < new Date().getTime() / 1000) {
      //   const data = await refreshToken();
      //   const refreshUser = {
      //     ...user,
      //     accessToken: data.accessToken,
      //   };
      //   dispatch(stateSuccess(refreshUser));
      //   config.headers["token"] = `Bearer ${data.accessToken}`;
      // }
      return config;
    },
    (err) => Promise.reject(err)
  );

  newInstance.interceptors.response.use(
    async (response) => {
      if (response && response.data) {
        return response.data;
      }
      return response;
    },
    (err) => {
      throw err;
    }
  );

  return newInstance;
};
