import React from "react";
import { Outlet } from "react-router-dom";
import ListProduct from "../../components/ListProduct";
import SideBar from "../../layouts/Sidebar/SideBar";

const Search = () => {
  return (
    <section className="flex">
      <SideBar />
      <ListProduct />
    </section>
  );
};

export default Search;
