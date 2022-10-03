import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosClient } from "../../lib/axios/axios.config";
import { endpoints } from "../../configs/Apis";

function Navbar() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getAllCategories = async () => {
      const data = await axiosClient.get(endpoints.categories);
      setCategories(data);
    };
    getAllCategories();
  }, []);
  return (
    <nav className="px-5 h-12 flex items-center bg-orange-400">
      <div className="grow overflow-hidden">
        {categories.map((category) => (
          <span
            key={category.id}
            className="capitalize py-2 px-3 text-[#4e4d53] hover:text-[#736d65] truncate "
          >
            <Link to="/">{category.name}</Link>
          </span>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;
