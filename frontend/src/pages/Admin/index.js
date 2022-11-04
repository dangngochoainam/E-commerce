import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import SideBarAdmin from '../../layouts/Sidebar/SideBarAdmin';
import { useSelector } from 'react-redux';

const Admin = () => {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.currentUser);

  useEffect(() => {
    if (currentUser?.roles !== 'ADMIN') {
      navigate('/');
    }
  }, [currentUser]);
  return (
    <>
      <section className="flex">
        <SideBarAdmin />
        <Outlet />
      </section>
    </>
  );
};

export default Admin;
