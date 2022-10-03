import { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { FiShoppingCart } from "react-icons/fi";

import { useNavigate } from "react-router-dom";

const Header = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (search) {
      navigate(`/search/?kw=${search}`);
    }
  };

  return (
    <>
      <header className="bg-[#1a94ff] opacity-90">
        <div className="flex items-center">
          <div className="mr-40">
            <img
              className="w-20 h-20"
              src="https://res.cloudinary.com/de5pwc5fq/image/upload/v1664506111/test_evbxct.png"
              alt="logo"
            />
          </div>
          <div className="flex justify-between grow">
            <div className="flex grow items-center mr-7">
              <input
                className="grow h-10 px-4 outline-none"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Nhập tên sản phẩm bạn muốn tìm kiếm ..."
                id="search"
              />
              <label htmlFor="search">
                <button
                  onClick={handleSearch}
                  className="flex px-2 items-center h-10 bg-[#0d5cb6]"
                >
                  <span>
                    <BiSearchAlt />
                  </span>
                  Tìm kiếm
                </button>
              </label>
            </div>
            <div className="flex items-center  mr-7">
              <img
                className="w-20 h-20"
                src="https://res.cloudinary.com/de5pwc5fq/image/upload/v1664117744/Ecommerce/rnyw4qbolvzyvtpzvucl.png"
                alt="avatar"
              />
              <div>
                <span className="block">Tài khoản</span>
                <span className="block">Đặng Ngọc Hoài Nam</span>
              </div>
            </div>
            <div className="flex items-center">
              <span>
                <FiShoppingCart className="text-3xl" />
              </span>
              <span>Giỏ hàng</span>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
