import { FiShoppingCart } from 'react-icons/fi';
import { FaRegUser } from 'react-icons/fa';
import LoginModal from '../../components/Modal/LoginModal';
import { MdOutlineArrowDropDown } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import InputSearch from '../../components/Search/InputSearch';
import './style.scss';
import { toast } from 'react-toastify';
import { authAxios } from '../../lib/axios/axios.config';
import { logoutSuccess } from '../../lib/redux/authSlide';
import { countProduct } from '../../lib/redux/cartSlide';
import Notification from '../../components/Notification';

import { useEffect, useState } from 'react';
import { socket } from '../../utils';
import { getNotification } from '../../utils/apiNotification';

const Header = () => {
  const [notification, setNotification] = useState([]);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const totalProduct = useSelector((state) => state.cart.totalProduct);
  const dispatch = useDispatch();
  const handleLogOut = async () => {
    try {
      const { data: res } = await authAxios(currentUser).post('/logout');
      if (res.status === 204) {
        localStorage.removeItem('auth');
        dispatch(logoutSuccess());
        dispatch(countProduct(0));
        socket.emit('logout');
        toast.success('Thoát tài khoản thành công', { theme: 'colored' });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error, { theme: 'colored' });
    }
  };

  const loadNotification = async () => {
    try {
      const res = await getNotification(currentUser);
      if (res.status === 200) {
        setNotification(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (currentUser) {
      loadNotification();
    } else {
      setNotification([]);
    }
  }, [currentUser]);

  useEffect(() => {
    console.log('useEffect in notification');

    socket.off('getNotification').on('getNotification', (data) => {
      setNotification((prev) => [ data, ...prev]);
    });

  }, [socket]);

  console.log(notification);

  return (
    <>
      <header className="bg-[#0083ff] text-white header">
        <section className="w-10/12 m-auto">
          <div className="flex items-center">
            <div className="mr-40">
              <Link to="/">
                <img
                  className="w-20 h-20"
                  src="https://res.cloudinary.com/de5pwc5fq/image/upload/v1666019608/825b219385d46_k9zpfl.png"
                  alt="logo"
                />
              </Link>
            </div>
            <div className="flex justify-between grow">
              <InputSearch />

              <div className="flex items-center mr-2">
                {currentUser ? (
                  <span className="w-12 h-12 rounded-full">
                    <img
                      src={currentUser.avatar}
                      alt="avatar"
                      className="h-full w-full object-cover rounded-full"
                    />
                  </span>
                ) : (
                  <span className="text-3xl">
                    <FaRegUser />
                  </span>
                )}

                <div className="ml-2 relative z-50 flex items-center">
                  {currentUser ? (
                    <>
                      <button
                        className="btn-login flex flex-col h-20 justify-center"
                        type="button"
                      >
                        <span className="capitalize block text-xs">
                          Tài khoản
                        </span>
                        <span className="inline-block text-sm isLogin">
                          {`${currentUser.firstname} ${currentUser.lastname}`}
                          <MdOutlineArrowDropDown className="inline-block text-xl" />

                          <ul className="sub__nav">
                            <li className="sub__item">
                              <Link to={`/account/${currentUser.id}`}>
                               🦸‍♂️ Trang cá nhân
                              </Link>
                            </li>
                            {currentUser.roles === 'STAFF' ? (
                              <li className="sub__item">
                                <Link to="/staff">🏠 Trang quản lý</Link>
                              </li>
                            ) : null}

                            {currentUser.roles === 'ADMIN' ? (
                              <li className="sub__item">
                                <Link to="/admin">🏠 Trang quản trị</Link>
                              </li>
                            ) : null}
                            <li className="sub__item">📗 Đơn hàng của bạn</li>
                            <li className="sub__item" onClick={handleLogOut}>
                              ➡ Thoát tài khoản
                            </li>
                          </ul>
                        </span>
                      </button>
                      <button className="btn-notif h-20 flex mx-4 items-center text-gray-600 focus:outline-none relative">
                        <svg
                          className="w-6 h-6"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M15 17H20L18.5951 15.5951C18.2141 15.2141 18 14.6973 18 14.1585V11C18 8.38757 16.3304 6.16509 14 5.34142V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V5.34142C7.66962 6.16509 6 8.38757 6 11V14.1585C6 14.6973 5.78595 15.2141 5.40493 15.5951L4 17H9M15 17V18C15 19.6569 13.6569 21 12 21C10.3431 21 9 19.6569 9 18V17M15 17H9"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </svg>

                        <Notification notifications={notification} />
                      </button>
                    </>
                  ) : (
                    <LoginModal />
                  )}
                </div>
              </div>
              <div className="flex items-center">
                <Link
                  to="/cart"
                  className="inline-flex relative items-center p-3 text-sm font-medium text-center text-white"
                >
                  <span className="text-3xl mr-2">
                    <FiShoppingCart />
                  </span>
                  <span className=" self-end"> Giỏ hàng</span>
                  <div className="inline-flex absolute top-0 left-8 justify-center items-center w-5 h-5 text-xs font-bold text-black bg-yellow-500 rounded-full ">
                    {totalProduct}
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </header>
    </>
  );
};

export default Header;
