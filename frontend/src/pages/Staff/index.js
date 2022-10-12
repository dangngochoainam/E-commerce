import React from "react";
import { Outlet } from "react-router-dom";
import SideBarStaff from "../../layouts/Sidebar/SideBarStaff";

const Staff = () => {

  
  
  return (
    <>
      <section className="flex">
        <SideBarStaff />
        <Outlet/>
      </section>
    </>
  );
};

export default Staff;
