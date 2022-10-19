import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fetchCategory } from "../../utils/apiCategory";
import queryString from "query-string";

const SideBar = () => {
  const location = useLocation();
  let params = queryString.parse(location.search);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [price, setPrice] = useState({
    fP: 0,
    tP: 0,
  });
  const fetchAPI = async () => {
    try {
      const resCategory = await fetchCategory();
      console.log(resCategory);
      if (resCategory.status === 200) {
        setCategories(resCategory.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changeInput = (obj) => {
    setPrice({
      ...price,
      ...obj,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(
      `${location.pathname}?${`kw=${params.kw}&`}${
        params.cate ? `cate=${params.cate}&` : ""
      }fP=${price.fP}&tP=${price.tP}`
    );
  };

  useEffect(() => {
    console.log("useEffect of Sidebar");
    fetchAPI();
  }, []);
  return (
    <div className="px-3 mt-5">
      <div className="">
        <h5 className="font-medium text-lg">Theo danh mục</h5>
        <div className="pl-3">
          <ul className="text-md font-medium text-light-gray">
            {categories.map((c) => (
              <li key={c.id} className="">
                <Link
                  className="hover:text-gray-700"
                  to={`${location.pathname}?${`kw=${params.kw}&`}cate=${c.id}`}
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-gray-200 h-[1px] w-full my-3"></div>

      <div>
        <h5 className="font-medium text-lg">Giá</h5>
        <form className="pl-3" onSubmit={handleSubmit}>
          <div>
            <p className="text-md font-medium text-light-gray">
              Chọn khoảng giá
            </p>
            <input
              className="border border-solid border-gray-400 outline-none w-20 rounded-md"
              type="text"
              id="fP"
              name="fP"
              value={price.fP}
              onChange={(e) => changeInput({ fP: e.target.value })}
            />
            {" -> "}

            <input
              className="border border-solid border-gray-400 outline-none w-20 rounded-md"
              type="text"
              id="tP"
              name="tP"
              value={price.tP}
              onChange={(e) => changeInput({ tP: e.target.value })}
            />
          </div>
          <input
            className="mt-3 border border-solid border-blue-400 text-blue-700 w-full rounded-lg cursor-pointer"
            type="submit"
            value="Áp dụng"
          />
        </form>
      </div>
    </div>
  );
};

export default SideBar;
