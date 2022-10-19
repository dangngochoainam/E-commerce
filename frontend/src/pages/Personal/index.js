import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Brand from "../../components/Brand";
import { endpoints } from "../../configs/Apis";
import { useSelector } from "react-redux";
import { axiosClient } from "../../lib/axios/axios.config";

const Personal = () => {
  const { userId } = useParams();
  const [user, setUser] = useState();
  const [shop, setShop] = useState([]);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const fetchUser = async () => {
    const res = await axiosClient.get(`${endpoints.users}${userId}`);
    setUser(res.data);
    console.log(res.data);
  };
  const fetchShop = async () => {
    const res = await axiosClient.get(`${endpoints.users}${userId}/shops`);
    setShop(res.data);
  };
  useEffect(() => {
    fetchUser();

    fetchShop();
  }, [userId]);
  return (
    <>
      <section className="flex flex-col items-center justify-center">
        {user && (
          <>
            <div className="h-14 w-14 mb-5">
              <img
                className="h-full w-full object-cover rounded-full"
                src={user.avatar}
                alt="avatar"
              />
            </div>
            <h3 className="mb-3">
              Họ tên:{" "}
              <span>
                {user.firstname} {user.lastname}
              </span>
            </h3>
            <p className="mb-3">
              Số điện thoại: <span>{user.phone}</span>
            </p>
            <p className="mb-3">
              Email:<span>{user.email}</span>{" "}
            </p>
            <p className="mb-3">
              Ngày sinh: <span>{user.birthday}</span>
            </p>
            <p className="mb-3">
              Địa chỉ: <span>{user.address}</span>
            </p>
            {user?.seller?.isConfirm === false ? (
              <p className="mb-3">Đang đợi nhân viên kiểm duyệt</p>
            ) : null}

            <h3 className="text-center text-xl mt-5">
              Các cửa hàng của{" "}
              <span>
                {user.firstname} {user.lastname}
              </span>
            </h3>

            {currentUser?.id === user?.id && user?.seller?.isConfirm ? (
              <>
                {user.roles === "CUSTOMER" && (
                  <div className="mt-5">
                    <button className="px-3 py-2 rounded-lg bg-blue-500 text-white">
                      Đăng ký trở thành người bán hàng
                    </button>
                  </div>
                )}
                <div className="mt-5">
                  <Link
                    to="/createShop"
                    className="px-3 py-2 rounded-lg bg-blue-500 text-white"
                  >
                    Tạo cửa hàng
                  </Link>
                </div>
              </>
            ) : null}

            <div className="mt-5 flex justify-around flex-wrap">
              {shop.map((s) => (
                <Brand key={s.id} shopId={s.id} />
              ))}
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default Personal;
