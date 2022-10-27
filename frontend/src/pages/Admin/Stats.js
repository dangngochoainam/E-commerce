import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useLocation } from 'react-router-dom';

import * as Yup from 'yup';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { formatMoney, randomColor } from '../../utils';
import { stats } from '../../utils/apiAdmin';
import { fetchShop } from '../../utils/apiShop';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      // text: 'Chart.js Bar Chart',
    },
  },
};

const Stats = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [dataTable, setDataTable] = useState();
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: '',
        data: [],
        backgroundColor: [],
      },
    ],
  });
  const [shop, setShop] = useState([]);
  const formik = useFormik({
    initialValues: {
      shopId: 0,
      quater: '',
      month: '',
      year: '',
    },
    validationSchema: Yup.object({
      shopId: Yup.number(),
      quater: Yup.number(),
      month: Yup.number(),
      year: Yup.number(),
    }),
    onSubmit: async (values) => {
      try {
        let params = {
          ...values,
          type: 'TOTAL_PRODUCT',
        };
        getStats(currentUser, params);
      } catch (error) {
        console.log(error);
      }
    },
  });

  const getStats = async (currentUser, params) => {
    try {
      const res = await stats(currentUser, params);
      console.log(res);
      if (res.status === 200) {
        setDataTable(res.data);
        const temp = {
          labels: res.data.reduce((acc, item) => {
            return [...acc, item.name];
          }, []),
          datasets: [
            {
              label: 'Thống kê doanh thu theo danh mục',
              data: res.data.reduce((acc, item) => {
                return [...acc, item.revenue];
              }, []),
              backgroundColor: res.data.reduce((acc, item) => {
                return [...acc, randomColor()];
              }, []),
            },
          ],
        };
        setData(temp);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAPI = async () => {
    let params = {
      type: 'TOTAL_PRODUCT',
    };

    const res = await fetchShop();
    if (res.status === 200) {
      setShop(res.data);
    }

    getStats(currentUser, params);
  };

  useEffect(() => {
    fetchAPI();
  }, []);
  return (
    <>
      <section className="grow my-5">
        <h1 className="text-center text-blue-600 xl:text-2xl my-3">
          Thống kê doanh thu của sàn
        </h1>
        <div>
          <div className="flex justify-center bg-blue-200">
            <form className="w-5/12 p-3" onSubmit={formik.handleSubmit}>
              <div className="flex justify-between items-center mb-3">
                <label
                  htmlFor="categoryId"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Cửa hàng
                </label>
                <select
                  id="categoryId"
                  name="categoryId"
                  className="bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-7/12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={formik.values.shopId}
                  {...formik.getFieldProps('shopId')}
                >
                  <option value={0}>Chọn cửa hàng</option>
                  {shop.map((s) => (
                    <>
                      <option value={s.id}>{s.name}</option>
                    </>
                  ))}
                </select>
                {formik.touched.shopId && formik.errors.shopId ? (
                  <div className="ml-5 text-red-700 mb-3">
                    {formik.errors.shopId}
                  </div>
                ) : null}
              </div>
              <div className="flex justify-between items-center mb-3">
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  htmlFor="quater"
                >
                  Quý:
                </label>
                <input
                  className="bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-7/12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="number"
                  id="quater"
                  name="quater"
                  {...formik.getFieldProps('quater')}
                />
                {formik.touched.quater && formik.errors.quater ? (
                  <div className="ml-5 text-red-700 mb-3">
                    {formik.errors.quater}
                  </div>
                ) : null}
              </div>
              <div className="flex justify-between items-center mb-3">
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  htmlFor="month"
                >
                  Tháng:
                </label>
                <input
                  className="bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-7/12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="number"
                  id="month"
                  name="month"
                  {...formik.getFieldProps('month')}
                />
                {formik.touched.month && formik.errors.month ? (
                  <div className="ml-5 text-red-700 mb-3">
                    {formik.errors.month}
                  </div>
                ) : null}
              </div>

              <div className="flex justify-between items-center mb-3">
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  htmlFor="year"
                >
                  Năm:
                </label>
                <input
                  className="bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-7/12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="number"
                  id="year"
                  name="year"
                  {...formik.getFieldProps('year')}
                />
                {formik.touched.year && formik.errors.year ? (
                  <div className="ml-5 text-red-700 mb-3">
                    {formik.errors.year}
                  </div>
                ) : null}
              </div>
              <button
                type="submit"
                className="block text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-auto mb-2"
              >
                Thống kê
              </button>
            </form>
          </div>
          <div className="flex flex-col justify-between mt-5">
            <div className="text-black">
              <Bar options={options} data={data} height={100} />
            </div>
            <div className="text-black mt-5">
              <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="py-3 px-6">
                        Tên cửa hàng
                      </th>
                      <th scope="col" className="py-3 px-6">
                        Số lượng sản phẩm
                      </th>
                      <th scope="col" className="py-3 px-6">
                        Doanh thu
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataTable &&
                      dataTable.map((data) => {
                        return (
                          <>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                              <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {data.name}
                              </td>
                              <td className="py-4 px-6 capitalize">
                                {data.quantity}
                              </td>
                              <td className="py-4 px-6">
                                <span className="text-price-color font-medium">
                                  {formatMoney(data.revenue)}{' '}
                                  <span className="underline">đ</span>
                                </span>
                              </td>
                            </tr>
                          </>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Stats;
