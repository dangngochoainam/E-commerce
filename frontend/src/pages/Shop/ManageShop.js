import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { endpoints } from "../../configs/Apis";
import SideBarShop from "../../layouts/Sidebar/SideBarShop";
import { axiosClient } from "../../lib/axios/axios.config";

const ManageShop = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const { shopId } = useParams();
  const [userOfShop, setUserOfShop] = useState();
  const navigate = useNavigate();
  const getUserIDByShopID = async (shopId) => {
    const res = await axiosClient.post(`${endpoints.shop}ofUser`, {
      shopId: shopId,
    });
    setUserOfShop(parseInt(res.data));
  };
  useEffect(() => {
    getUserIDByShopID(shopId);

    if (userOfShop && userOfShop !== currentUser?.id) {
      navigate("/");
    }
  }, [userOfShop, currentUser]);
  return (
    <section className="flex">
      <SideBarShop />
      <Outlet />
    </section>
  );
};

export default ManageShop;
