import React, { useEffect, useState } from 'react';
import {
  AiFillStar,
  AiOutlinePlus,
  AiOutlineFileProtect,
  AiOutlineLike,
  AiOutlineRollback,
} from 'react-icons/ai';
import { BsShop } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { endpoints } from '../../configs/Apis';
import { axiosClient } from '../../lib/axios/axios.config';
import { useSelector } from 'react-redux';
import './style.scss';

const Brand = ({ shopId, layout }) => {
  const [shop, setShop] = useState();
  const [search, setSearch] = useState('');
  const [userOfShop, setUserOfShop] = useState(0);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const navigate = useNavigate();
  const getShop = async (shopId) => {
    const res = await axiosClient.get(`${endpoints.shop}${shopId}`);
    setShop(res.data);
  };
  const getUserIDByShopID = async (shopId) => {
    const res = await axiosClient.post(`${endpoints.shop}ofUser`, {
      shopId: shopId,
    });
    setUserOfShop(parseInt(res.data));
  };
  useEffect(() => {
    console.log('useEffect Brand');
    getUserIDByShopID(shopId);
    getShop(shopId);
  }, [shopId]);

  const handleSearch = (e) => {
    e.preventDefault();

    navigate(`/shop/${shopId}?kw=${search}`);
  };
  return (
    <>
      {shop && layout !== 'horizontal' ? (
        <div className="right min-w-[300px] border border-gray-200 rounded p-2 mb-2">
          <div className="capitalize flex mb-5">
            <img
              className="w-8 h-12 object-cover"
              src="https://res.cloudinary.com/de5pwc5fq/image/upload/v1664435281/paul-pastourmatzis-ysA6qL8j-OI-unsplash_wytv3q.jpg"
              alt="Logo shop"
            />
            <div className="font-medium ml-5">
              <p>{shop.name}</p>
              <img
                className="object-contain h-5 w-14"
                src="https://salt.tikicdn.com/cache/w100/ts/upload/e8/6a/e3/7f998ef1eb5ab0536aac53f02a698c8a.png.webp"
                alt="Độ tin cậy"
              />
            </div>
          </div>
          <div className="flex justify-between capitalize mb-5">
            <div>
              <div className="font-medium flex items-center">
                {shop.rate} / 5
                <span className="pl-1">
                  <AiFillStar color="rgb(253, 216, 54)" />
                </span>
              </div>
              <p className="text-light-gray text-[12px] text-center">3.5k+</p>
            </div>
            <div>
              <div className="font-medium  text-center">3.1k+</div>
              <p className="text-light-gray text-[12px] text-center">
                <Link to={`shop/${shopId}/manage`}>Trang quản lý</Link>
              </p>
            </div>

            <div>
              <div className="font-medium text-center">93%</div>
              <p className="text-light-gray text-[12px] text-center">
                phản hồi chat
              </p>
            </div>
          </div>
          <div className="flex justify-between  text-sm  text-dark-blue capitalize font-medium mb-5">
            <span className="inline-block w-[48%] px-3 py-1  border border-blue-600 rounded">
              <Link className="flex items-center" to={`/shop/${shopId}`}>
                <span className="mr-2">
                  <BsShop />
                </span>
                xem shop
              </Link>
            </span>
            {currentUser?.id === userOfShop ? (
              <span className="inline-block  w-[48%] px-3 py-1  border border-blue-600 rounded">
                <Link
                  className="flex items-center"
                  to={`/shop/${shopId}/manage`}
                >
                  <span className="mr-2">
                    <AiOutlinePlus />
                  </span>
                  Quản lý
                </Link>
              </span>
            ) : (
              <span className="inline-block  w-[48%] px-3 py-1  border border-blue-600 rounded">
                <Link className="flex items-center" to="/">
                  <span className="mr-2">
                    <AiOutlinePlus />
                  </span>
                  Theo dõi
                </Link>
              </span>
            )}
          </div>
          <div className="flex justify-between p-2">
            <div className="flex flex-col items-center text-character-color">
              <span className="text-blue-400 text-3xl">
                <AiOutlineFileProtect />
              </span>
              <span className="text-center mt-2 text-sm">
                Hoàn tiền <strong>111%</strong> nếu hàng giả
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-blue-400 text-3xl">
                <AiOutlineLike />
              </span>
              <span className="text-center mt-2 text-sm">
                Mở hộp kiểm tra nhận hàng
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-blue-400 text-3xl">
                <AiOutlineRollback />
              </span>
              <span className="text-center mt-2 text-sm">
                Đổi trả trong <strong>30 ngày</strong> nếu sp lỗi
              </span>
            </div>
          </div>
        </div>
      ) : (
        shop && (
          <>
            <div className="right w-full border border-gray-200 text-white items-center rounded p-2 flex container__shop--banner">
              <div className="capitalize flex items-center">
                <img
                  className="w-8 h-12 object-cover"
                  src="https://res.cloudinary.com/de5pwc5fq/image/upload/v1664435281/paul-pastourmatzis-ysA6qL8j-OI-unsplash_wytv3q.jpg"
                  alt="Logo shop"
                />
                <div className="font-medium ml-5">
                  <p>{shop.name}</p>
                  <img
                    className="object-contain h-5 w-14 mb-1"
                    src="https://salt.tikicdn.com/cache/w100/ts/upload/e8/6a/e3/7f998ef1eb5ab0536aac53f02a698c8a.png.webp"
                    alt="Độ tin cậy"
                  />
                  <div className="flex justify-between capitalize text-xs">
                    <div className="mr-3">
                      <div className="font-medium flex items-center">
                        {shop.rate} / 5
                        <span className="pl-1">
                          <AiFillStar color="rgb(253, 216, 54)" />
                        </span>
                      </div>
                    </div>
                    <div className="flex mr-3">
                      <div className="font-medium  text-center">3.1k+</div>
                      <p className="text-light-gray  text-center">theo dõi</p>
                    </div>
                    <div className="flex mr-3">
                      <div className="font-medium text-center">93%</div>
                      <p className="text-light-gray  text-center">
                        phản hồi chat
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between  text-sm  text-white   capitalize font-medium border-l border-solid border-gray-400 ml-5">
                <span className="inline-block  w-[100%] px-3 py-2 ml-3 bg-blue-700 rounded-lg">
                  <Link className="flex items-center" to="/">
                    <span className="mr-2">
                      <AiOutlinePlus />
                    </span>
                    Theo dõi
                  </Link>
                </span>
              </div>

              <form className="ml-auto w-64" onSubmit={handleSearch}>
                <label
                  htmlFor="default-search"
                  className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
                >
                  Search
                </label>
                <div className="relative">
                  <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      ></path>
                    </svg>
                  </div>
                  <input
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    id="default-search"
                    className="block p-1 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Nhập tên sản phẩm..."
                  />
                  <button
                    type="submit"
                    className="h-full text-white absolute right-0 bottom-0 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
          </>
        )
      )}
    </>
  );
};

export default Brand;
