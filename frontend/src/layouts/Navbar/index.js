import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosClient } from "../../lib/axios/axios.config";
import { endpoints } from "../../configs/Apis";
import "./style.scss";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

function Navbar() {
  const [categories, setCategories] = useState([]);
  const [nextScroll, setNextScroll] = useState(false);

  useEffect(() => {
    const getAllCategories = async () => {
      const res = await axiosClient.get(endpoints.categories);
      setCategories(res.data);
    };
    getAllCategories();
  }, []);

  const handleScroll = () => {
    document.querySelector(".navbar").classList.toggle("slider");
    setNextScroll(!nextScroll);
  };
  return (
    <nav className="px-5 h-12 flex items-center bg-white border-b-8 border-solid border-gray-200">
      {nextScroll && (
        <span
          className="font-bold text-xl cursor-pointer"
          onClick={handleScroll}
        >
          <GrFormPrevious />
        </span>
      )}
      <div className="grow overflow-hidden w-[1240px]">
        <div className="grow navbar">
          {categories.map((category) => (
            <span
              key={category.id}
              className="capitalize py-2 px-3 text-[#4e4d53] hover:text-[#736d65] truncate"
            >
              <Link to={`/categories/${category.id}`}>{category.name}</Link>
            </span>
          ))}
        </div>
      </div>
      {nextScroll || (
        <span
          className="font-bold text-xl cursor-pointer"
          onClick={handleScroll}
        >
          <GrFormNext />
        </span>
      )}
    </nav>
  );
}

export default Navbar;
