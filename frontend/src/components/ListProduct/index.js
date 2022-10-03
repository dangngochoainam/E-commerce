import React, { useEffect, useState } from "react";
import "./style.scss";
import { AiFillStar } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import queryString from "query-string";
import { axiosClient } from "../../lib/axios/axios.config";
import { endpoints } from "../../configs/Apis";
const ListProduct = () => {
  const [products, setProducts] = useState([]);
  let location = useLocation();
  let params = queryString.parse(location.search);

  console.log(params);

  useEffect(() => {
    console.log("in useEffect");
    const getProducts = async () => {
      const data = await axiosClient.get(endpoints.products, {
        params: {
          kw: params.kw,
          sortBy: params.sortBy,
          order: params.order,
        },
      });
      console.log(data);
      setProducts(data);
    };
    getProducts();
  }, [location]);

  return (
    <>
      <section className="">
        <div className="product__filter px-5 h-12 flex items-center border-b border-[light-gray]">
          <ul className="flex">
            <li className="filter__item mr-5 ">
              <Link to={`/search/?kw=${params.kw}&sortBy=newest`}>
                Hàng mới
              </Link>
            </li>
            <li className="filter__item mr-5">
              {" "}
              <Link to={`/search/?kw=${params.kw}&sortBy=name&order=desc`}>
                sắp xếp theo tên
              </Link>
            </li>
            <li className="filter__item mr-5">
              {" "}
              <Link to={`/search/?kw=${params.kw}&sortBy=price&order=asc`}>
                giá thấp đến cao
              </Link>
            </li>
            <li className="filter__item mr-5">
              <Link to={`/search/?kw=${params.kw}&sortBy=price&order=desc`}>
                giá cao đến thấp
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-wrap">
          {products.map((p) => (
            <div
              key={p.id}
              className="flex flex-col bg-white w-[20%] p-3 mb-3 hover:shadow-product"
            >
              <Link to="/">
                <img
                  className="w-40 h-44 m-auto"
                  src={p.image}
                  alt="Ảnh sản phẩm"
                />

                <div className="grow flex flex-col px-2 py-2">
                  <h4 className="item__product-name leading-6 h-12 pb-3 my-2 capitalize">
                    {p.name}
                  </h4>
                  <div className=" grow flex items-center h-4 pt-1">
                    <div className="flex pr-1">
                      <AiFillStar color="rgb(253, 216, 54)" />
                      <AiFillStar color="rgb(253, 216, 54)" />
                      <AiFillStar color="rgb(253, 216, 54)" />
                      <AiFillStar color="rgb(253, 216, 54)" />
                      <AiFillStar />
                    </div>
                    <div className="text-xs border-l border-gray-400 pl-1 text-light-gray">
                      Đã bán 1
                    </div>
                  </div>
                  <div className="pt-2 flex items-center">
                    <span className="text-price-color pr-1">
                      <b>
                        {p.price} <span className="underline">đ</span>
                      </b>
                    </span>
                    <span className="text-promotion-color text-xs">
                      <b>
                        <em>-32%</em>
                      </b>
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}

          {/* <div className="flex flex-col bg-white w-[20%] p-3 mb-3 hover:shadow-product">
            <Link to="/">
              <img
                className="w-40 h-44 m-auto"
                src="https://res.cloudinary.com/de5pwc5fq/image/upload/v1662604343/bfdmumzyuioc4hs7szox.jpg"
                alt="logo"
              />

              <div className="grow flex flex-col px-2 py-2">
                <h4 className="item__product-name leading-6 h-12 pb-3">
                  Trí tuệ do thái
                </h4>
                <div className=" grow flex items-center h-4 pt-1">
                  <div className="flex pr-1">
                    <AiFillStar color="rgb(253, 216, 54)" />
                    <AiFillStar color="rgb(253, 216, 54)" />
                    <AiFillStar color="rgb(253, 216, 54)" />
                    <AiFillStar color="rgb(253, 216, 54)" />
                    <AiFillStar />
                  </div>
                  <div className="text-xs border-l border-gray-400 pl-1 text-light-gray">
                    Đã bán 1
                  </div>
                </div>
                <div className="pt-2 flex items-center">
                  <span className="text-red-500 pr-1">
                    <b>
                      129.000 <span className="underline">đ</span>
                    </b>
                  </span>
                  <span className="text-red-400 text-xs">
                    <b>
                      <em>-32%</em>
                    </b>
                  </span>
                </div>
              </div>
            </Link>
          </div>
          <div className="flex flex-col bg-white w-[20%] p-3 mb-3 hover:shadow-product">
            <Link to="/">
              <img
                className="w-40 h-44 m-auto"
                src="https://res.cloudinary.com/de5pwc5fq/image/upload/v1662604343/bfdmumzyuioc4hs7szox.jpg"
                alt="logo"
              />

              <div className="grow flex flex-col px-2 py-2">
                <h4 className="item__product-name leading-6 h-12 pb-3">
                  Trí tuệ do thái
                </h4>
                <div className=" grow flex items-center h-4 pt-1">
                  <div className="flex pr-1">
                    <AiFillStar color="rgb(253, 216, 54)" />
                    <AiFillStar color="rgb(253, 216, 54)" />
                    <AiFillStar color="rgb(253, 216, 54)" />
                    <AiFillStar color="rgb(253, 216, 54)" />
                    <AiFillStar />
                  </div>
                  <div className="text-xs border-l border-gray-400 pl-1 text-light-gray">
                    Đã bán 1
                  </div>
                </div>
                <div className="pt-2 flex items-center">
                  <span className="text-red-500 pr-1">
                    <b>
                      129.000 <span className="underline">đ</span>
                    </b>
                  </span>
                  <span className="text-red-400 text-xs">
                    <b>
                      <em>-32%</em>
                    </b>
                  </span>
                </div>
              </div>
            </Link>
          </div>
 */}
        </div>
      </section>
    </>
  );
};

export default ListProduct;
