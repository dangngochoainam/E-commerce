import React, { useEffect, useState } from "react";
import {
  AiFillStar,
  AiOutlinePlus,
  AiOutlineFileProtect,
  AiOutlineLike,
  AiOutlineRollback,
} from "react-icons/ai";
import { BsShop } from "react-icons/bs";
import { Link } from "react-router-dom";
import { endpoints } from "../../configs/Apis";
import { axiosClient } from "../../lib/axios/axios.config";

const Brand = ({ shopId }) => {
  const [shop, setShop] = useState();
  useEffect(() => {
    console.log("useEffect Brand");
    const getShop = async (shopId) => {
      const shop = await axiosClient.get(`${endpoints.shop}${shopId}`);
      setShop(shop);
    };
    getShop(shopId);
  }, [shopId]);
  return (
    <>
      {shop && (
        <div className="right w-4/12 border border-gray-200 rounded p-2">
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
                theo dõi
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
              <Link className="flex items-center" to="/">
                <span className="mr-2">
                  <BsShop />
                </span>
                xem shop
              </Link>
            </span>
            <span className="inline-block  w-[48%] px-3 py-1  border border-blue-600 rounded">
              <Link className="flex items-center" to="/">
                <span className="mr-2">
                  <AiOutlinePlus />
                </span>
                Theo dõi
              </Link>
            </span>
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
      )}
    </>
  );
};

export default Brand;
