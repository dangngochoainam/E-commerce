import React, { useEffect, useState } from "react";
import { authAxios } from "../../lib/axios/axios.config";
import { endpoints } from "../../configs/Apis";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";

const ListSeller = () => {
  const [sellers, setSellers] = useState([]);
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const fetchSellerUnConfirm = async () => {
    const res = await authAxios(currentUser).get(
      `${endpoints.sellers}unConfirm`
    );

    if (res.status === 200) setSellers(res.data);
  };

  const handleConfirmSeller = async (sellerId) => {
    const res = await authAxios(currentUser).post(
      `${endpoints.staffs}grantRole`,
      {
        sellerId: sellerId,
      }
    );

    if (res.status === 200) {
      let newSellers = sellers.filter((seller) => seller.id !== sellerId);
      setSellers(newSellers);
      toast.success("Đã duyệt", { theme: "colored" });
    }
  };
  useEffect(() => {
    if (!currentUser || currentUser.roles !== "STAFF") {
      navigate("/");
    }
    try {
      fetchSellerUnConfirm();
    } catch (error) {
      console.log(error);
    }
  }, []);


  return (
    <div className="">
      <h1 className="text-center xl:text-4xl text-green-400 mb-3">
        Danh sách người đăng ký bán hàng
      </h1>
      <div className="w-full overflow-hidden rounded-lg shadow-xs">
        <div className="w-full overflow-x-auto">
          <table className="w-full whitespace-no-wrap">
            <thead className="">
              <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                <th className="px-4 py-3">Người đăng ký</th>
                <th className="px-4 py-3">Trạng thái</th>
                <th className="px-4 py-3">Ngày tạo</th>
                <th className="px-4 py-3"></th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
              {sellers.map((seller) => (
                <>
                  <tr
                    key={seller.id}
                    className="text-gray-700 dark:text-gray-400"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center text-sm">
                        <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                          <img
                            className="object-cover w-full h-full rounded-full"
                            src={seller.user.avatar}
                            alt=""
                            loading="lazy"
                          />
                          <div
                            className="absolute inset-0 rounded-full shadow-inner"
                            aria-hidden="true"
                          ></div>
                        </div>
                        <div>
                          <p className="font-semibold">
                            {seller.user.firstname} {seller.user.lastname}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs">
                      <span className="px-2 py-1 font-semibold leading-tight text-yellow-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
                        Đợi phê duyệt
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">{seller.createdAt}</td>
                    <td className="px-4 py-3 text-sm ">
                      <button
                        onClick={() => handleConfirmSeller(seller.id)}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Đồng ý
                      </button>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <button className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                        Từ chối
                      </button>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
        <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
          <span className="col-span-2"></span>
          <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
            <nav aria-label="Table navigation">
              <ul className="inline-flex items-center">
                <li>
                  <button
                    className="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
                    aria-label="Previous"
                  >
                    <svg
                      aria-hidden="true"
                      className="w-4 h-4 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                        fillRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </li>
                <li>
                  <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                    1
                  </button>
                </li>
                <li>
                  <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                    2
                  </button>
                </li>
                <li>
                  <button className="px-3 py-1 text-white transition-colors duration-150 bg-purple-600 border border-r-0 border-purple-600 rounded-md focus:outline-none focus:shadow-outline-purple">
                    3
                  </button>
                </li>
                <li>
                  <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                    4
                  </button>
                </li>
                <li>
                  <span className="px-3 py-1">...</span>
                </li>
                <li>
                  <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                    8
                  </button>
                </li>
                <li>
                  <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                    9
                  </button>
                </li>
                <li>
                  <button
                    className="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
                    aria-label="Next"
                  >
                    <svg
                      className="w-4 h-4 fill-current"
                      aria-hidden="true"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                        fillRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </li>
              </ul>
            </nav>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ListSeller;
