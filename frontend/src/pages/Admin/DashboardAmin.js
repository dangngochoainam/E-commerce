import React, { useState } from 'react';
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

import { PointElement, LineElement } from 'chart.js';
import { Line } from 'react-chartjs-2';

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

//line chart

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DashboardAdmin = () => {
  const [data, setData] = useState({
    labels: ['Mai Phương', 'Nhà sách hay', 'Nike, Adidas chính hãng'],
    datasets: [
      {
        label: 'Thống kê doanh thu theo cửa hàng',
        data: ['249000000', '100000000', '166000000'],
        backgroundColor: [
          'rgb(151, 165, 234)',

          'rgb(46, 241, 229)',

          'rgb(36, 181, 105)',
        ],
      },
    ],
  });

  const [data2, setData2] = useState({
    labels: ['Trí Tuệ Do Thái', 'Think And Grow Rich', 'iPhone 14 Pro'],
    datasets: [
      {
        label: 'Thống kê doanh thu sản phẩm',
        data: ['145000000', '175000000', '350000000'],
        backgroundColor: [
          'rgb(121, 105, 214)',

          'rgb(26, 41, 29)',

          'rgb(136, 111, 195)',
        ],
      },
    ],
  });
  return (
    <>
      <div className="w-full px-4 md:px-0 md:mt-8 mb-16 text-gray-800 leading-normal">
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2 xl:w-1/3 p-3">
            <div className="bg-white border rounded shadow p-2">
              <div className="flex flex-row items-center">
                <div className="flex-shrink pr-4">
                  <div className="rounded p-3 bg-green-600">
                    <i className="fa fa-wallet fa-2x fa-fw fa-inverse"></i>
                  </div>
                </div>
                <div className="flex-1 text-right md:text-center">
                  <h5 className="font-bold uppercase text-gray-500">
                    Tổng doanh thu
                  </h5>
                  <h3 className="font-bold text-3xl">
                    249,387,00 VNĐ{' '}
                    <span className="text-green-500">
                      <i className="fas fa-caret-up"></i>
                    </span>
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 xl:w-1/3 p-3">
            <div className="bg-white border rounded shadow p-2">
              <div className="flex flex-row items-center">
                <div className="flex-shrink pr-4">
                  <div className="rounded p-3 bg-pink-600">
                    <i className="fas fa-users fa-2x fa-fw fa-inverse"></i>
                  </div>
                </div>
                <div className="flex-1 text-right md:text-center">
                  <h5 className="font-bold uppercase text-gray-500">
                    Số lượng sản phẩm
                  </h5>
                  <h3 className="font-bold text-3xl">
                    32{' '}
                    <span className="text-pink-500">
                      <i className="fas fa-exchange-alt"></i>
                    </span>
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 xl:w-1/3 p-3">
            <div className="bg-white border rounded shadow p-2">
              <div className="flex flex-row items-center">
                <div className="flex-shrink pr-4">
                  <div className="rounded p-3 bg-yellow-600">
                    <i className="fas fa-user-plus fa-2x fa-fw fa-inverse"></i>
                  </div>
                </div>
                <div className="flex-1 text-right md:text-center">
                  <h5 className="font-bold uppercase text-gray-500">
                    Số lượng người dùng
                  </h5>
                  <h3 className="font-bold text-3xl">
                    65{' '}
                    <span className="text-yellow-600">
                      <i className="fas fa-caret-up"></i>
                    </span>
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 xl:w-1/3 p-3">
            <div className="bg-white border rounded shadow p-2">
              <div className="flex flex-row items-center">
                <div className="flex-shrink pr-4">
                  <div className="rounded p-3 bg-blue-600">
                    <i className="fas fa-server fa-2x fa-fw fa-inverse"></i>
                  </div>
                </div>
                <div className="flex-1 text-right md:text-center">
                  <h5 className="font-bold uppercase text-gray-500">
                    Số lượng cửa hàng
                  </h5>
                  <h3 className="font-bold text-3xl">23</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 xl:w-1/3 p-3">
            <div className="bg-white border rounded shadow p-2">
              <div className="flex flex-row items-center">
                <div className="flex-shrink pr-4">
                  <div className="rounded p-3 bg-indigo-600">
                    <i className="fas fa-tasks fa-2x fa-fw fa-inverse"></i>
                  </div>
                </div>
                <div className="flex-1 text-right md:text-center">
                  <h5 className="font-bold uppercase text-gray-500">
                    Số người đăng ký bán hàng
                  </h5>
                  <h3 className="font-bold text-3xl">13</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 xl:w-1/3 p-3">
            <div className="bg-white border rounded shadow p-2">
              <div className="flex flex-row items-center">
                <div className="flex-shrink pr-4">
                  <div className="rounded p-3 bg-red-600">
                    <i className="fas fa-inbox fa-2x fa-fw fa-inverse"></i>
                  </div>
                </div>
                <div className="flex-1 text-right md:text-center">
                  <h5 className="font-bold uppercase text-gray-500">
                    Số lượng người bán hàng
                  </h5>
                  <h3 className="font-bold text-3xl">
                    20{' '}
                    <span className="text-red-500">
                      <i className="fas fa-caret-up"></i>
                    </span>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-b-2 border-gray-400 my-8 mx-4" />

        <div className="flex flex-row flex-wrap flex-grow mt-2">
          <div className="w-full md:w-1/2 p-3">
            <div className="bg-white border rounded shadow">
              <div className="border-b p-3">
                <h5 className="font-bold uppercase text-gray-600">Graph</h5>
              </div>
              <div className="p-5">
                <div className="chartjs-size-monitor">
                  <div className="chartjs-size-monitor-expand">
                    <Bar options={options} data={data} height={200} />
                  </div>
                  <div className="chartjs-size-monitor-shrink"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 p-3">
            <div className="bg-white border rounded shadow">
              <div className="border-b p-3">
                <h5 className="font-bold uppercase text-gray-600">Graph</h5>
              </div>
              <div className="p-5">
                <div className="chartjs-size-monitor">
                  <div className="chartjs-size-monitor-expand">
                    <div>
                      <Line options={options} data={data2}  height={200}/>
                    </div>
                  </div>
                  <div className="chartjs-size-monitor-shrink"></div>
                </div>
                {/* <canvas
                      id="chartjs-0"
                      className="chartjs chartjs-render-monitor"
                      width="710"
                      height="355"
                      style="display: block; height: 284px; width: 568px;"
                    ></canvas> */}
                {/* <script>
                    new Chart(document.getElementById("chartjs-0"), {
                        "type": "line",
                        "data": {
                            "labels": ["January", "February", "March", "April", "May", "June", "July"],
                            "datasets": [{
                                "label": "Views",
                                "data": [65, 59, 80, 81, 56, 55, 40],
                                "fill": false,
                                "borderColor": "rgb(75, 192, 192)",
                                "lineTension": 0.1
                            }]
                        },
                        "options": {}
                    });
                </script> */}
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 xl:w-1/3 p-3">
            <div className="bg-white border rounded shadow">
              <div className="border-b p-3">
                <h5 className="font-bold uppercase text-gray-600">Graph</h5>
              </div>
              <div className="p-5">
                <div className="chartjs-size-monitor">
                  <div className="chartjs-size-monitor-expand"></div>
                  <div className="chartjs-size-monitor-shrink"></div>
                </div>
                {/* <canvas
                      id="chartjs-1"
                      className="chartjs chartjs-render-monitor"
                      width="446"
                      height="222"
                      style="display: block; height: 178px; width: 357px;"
                    ></canvas> */}
                {/* <script>
                    new Chart(document.getElementById("chartjs-1"), {
                        "type": "bar",
                        "data": {
                            "labels": ["January", "February", "March", "April", "May", "June", "July"],
                            "datasets": [{
                                "label": "Likes",
                                "data": [65, 59, 80, 81, 56, 55, 40],
                                "fill": false,
                                "backgroundColor": ["rgba(255, 99, 132, 0.2)", "rgba(255, 159, 64, 0.2)", "rgba(255, 205, 86, 0.2)", "rgba(75, 192, 192, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(153, 102, 255, 0.2)", "rgba(201, 203, 207, 0.2)"],
                                "borderColor": ["rgb(255, 99, 132)", "rgb(255, 159, 64)", "rgb(255, 205, 86)", "rgb(75, 192, 192)", "rgb(54, 162, 235)", "rgb(153, 102, 255)", "rgb(201, 203, 207)"],
                                "borderWidth": 1
                            }]
                        },
                        "options": {
                            "scales": {
                                "yAxes": [{
                                    "ticks": {
                                        "beginAtZero": true
                                    }
                                }]
                            }
                        }
                    });
                </script> */}
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 xl:w-1/3 p-3">
            <div className="bg-white border rounded shadow">
              <div className="border-b p-3">
                <h5 className="font-bold uppercase text-gray-600">Graph</h5>
              </div>
              <div className="p-5">
                <div className="chartjs-size-monitor">
                  <div className="chartjs-size-monitor-expand"></div>
                  <div className="chartjs-size-monitor-shrink"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 xl:w-1/3 p-3">
            <div className="bg-white border rounded shadow">
              <div className="border-b p-3">
                <h5 className="font-bold uppercase text-gray-600">Template</h5>
              </div>
              <div className="p-5"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardAdmin;
