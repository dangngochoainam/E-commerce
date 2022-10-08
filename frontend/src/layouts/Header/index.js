import { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { FiShoppingCart } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import LoginModal from "../../components/Modal/LoginModal";

import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    if (search) {
      setSearch("");
      navigate(`/search/?kw=${search}`);
    }
  };

  return (
    <>
      <header className="bg-[#0083ff] text-white">
        <section className="w-10/12 m-auto">
          <div className="flex items-center">
            <div className="mr-40">
              <Link to="/">
                <img
                  className="w-20 h-20"
                  src="https://res.cloudinary.com/de5pwc5fq/image/upload/v1665066411/Ecommerce/icons8-soundfry_m6yzzw.svg"
                  alt="logo"
                />
              </Link>
            </div>
            <div className="flex justify-between grow">
              <form
                className="flex justify-between grow"
                onSubmit={handleSearch}
              >
                <div className="flex grow items-center mr-7">
                  <input
                    className="grow h-10 px-4 outline-none text-black"
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Nhập tên sản phẩm bạn muốn tìm kiếm ..."
                    id="search"
                  />
                  <label htmlFor="search">
                    <button
                      type="submit"
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
              </form>
              <div className="flex items-center  mr-7">
                <span className="text-3xl">
                  <FaRegUser />
                </span>

                <div className="ml-2 relative z-50">
                  <LoginModal />
                </div>
              </div>
              <div className="flex items-center">
                <Link className=" flex items-center text-xs" to="/">
                  <span className="text-3xl mr-2">
                    <FiShoppingCart />
                  </span>
                  <span className=" self-end"> Giỏ hàng</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </header>
    </>
  );
};

export default Header;
