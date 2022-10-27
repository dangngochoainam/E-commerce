import { useEffect, useState } from 'react';
import { confirmOrder, getOrderUnConfirm } from '../../utils/apiOrder';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { HiOutlineTrash } from 'react-icons/hi';
import { GiConfirmed } from 'react-icons/gi';
import { AiOutlineEye } from 'react-icons/ai';

const ConfirmOrder = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const location = useLocation();
  const shopId = location.pathname.split('/')[2];
  const [orders, setOrders] = useState([]);

  const getOrder = async () => {
    try {
      const res = await getOrderUnConfirm(currentUser, shopId);
      if (res.status === 200) {
        console.log(res);
        setOrders(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const comfirm = async (currentUser, order) => {
    try {
      const res = await confirmOrder(currentUser, order);
      if (res.status === 200) {
        console.log(res.status);
        setOrders((preState) => {
          return [...preState].filter((state) => state.id !== order.orderId);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAPI = async () => {
    getOrder();
  };

  useEffect(() => {
    fetchAPI();
  }, [shopId]);

  return (
    <>
      <section className="grow">
        {orders.length > 0 ? (
          <div className="overflow-x-auto">
            <div className="min-w-screen min-h-screen flex justify-center bg-gray-100 font-sans overflow-hidden">
              <div className="w-full">
                <div className="bg-white shadow-md rounded">
                  <table className="min-w-max w-full table-auto">
                    <thead>
                      <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-2 px-3 text-left">Mã ĐH</th>
                        <th className="py-2 px-3 text-left">Khách hàng</th>
                        <th className="py-2 px-3 text-center">Ngày đặt hàng</th>
                        <th className="py-2 px-3 text-center">
                          Địa chỉ nhận hàng
                        </th>
                        <th className="py-2 px-3 text-center">
                          Hình thức thanh toán
                        </th>

                        <th className="py-2 px-3 text-center">Trạng thái</th>

                        <th />
                      </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                      {orders.map((order) => (
                        <tr
                          key={order.id}
                          className="border-b border-gray-200 hover:bg-gray-100"
                        >
                          <td className="py-2 px-3 text-left whitespace-nowrap">
                            <div className="flex items-center justify-center">
                              <span className="font-medium">{order.id}</span>
                            </div>
                          </td>
                          <td className="py-2 px-3 text-left">
                            <div className="flex items-center">
                              <div className="mr-2">
                                <img
                                  className="w-6 h-6 rounded-full"
                                  src={order.customer.user.avatar}
                                  alt="avatar"
                                />
                              </div>
                              <span>
                                {order.customer.user.firstname}{' '}
                                {order.customer.user.lastname}
                              </span>
                            </div>
                          </td>
                          <td className="py-2 px-3 text-center">
                            <div className="flex items-center justify-center">
                              <span>{order.createdAt} </span>
                            </div>
                          </td>

                          <td className="py-2 px-3 text-center">
                            <div className="flex items-center justify-center">
                              <span>{order.shipAddress}</span>
                            </div>
                          </td>

                          <td>
                            <div className="flex items-center justify-center">
                              <span>{order.payment}</span>
                            </div>
                          </td>
                          <td className="py-2 px-3 text-center">
                            <span className="bg-purple-200 text-purple-600 py-1 px-2 rounded-full text-xs">
                              {order.isConfirm
                                ? 'Đã phê duyệt'
                                : 'Đợi phê duyệt'}
                            </span>
                          </td>
                          <td className="py-2 px-3 text-center">
                            <div className="flex item-center justify-center">
                              <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer">
                                <button className="flex items-center">
                                  <AiOutlineEye />
                                </button>
                              </div>
                              <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer">
                                <button
                                  className="flex items-center"
                                  onClick={() =>
                                    comfirm(currentUser, {
                                      shopId: shopId,
                                      orderId: order.id,
                                      action: 'DONE',
                                    })
                                  }
                                >
                                  <GiConfirmed color="green" />
                                </button>
                              </div>
                              <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer">
                                <button
                                  className="flex items-center"
                                  onClick={() =>
                                    comfirm(currentUser, {
                                      shopId: shopId,
                                      orderId: order.id,
                                      action: 'CANCEL',
                                    })
                                  }
                                >
                                  <HiOutlineTrash color="red" />
                                </button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className='mt-5'>
            <p className='text-center text-red-500 '>Không có đơn hàng nào cần xác nhận</p>
          </div>
        )}
      </section>
    </>
  );
};

export default ConfirmOrder;
