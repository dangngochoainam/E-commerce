import React from "react";
import { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";

import { useNavigate } from "react-router-dom";

const InputSearch = () => {
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
      <form className="flex justify-between grow" onSubmit={handleSearch}>
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
    </>
  );
};

export default InputSearch;
