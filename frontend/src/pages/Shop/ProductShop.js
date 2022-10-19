import React, { useEffect, useState } from "react";
import { endpoints } from "../../configs/Apis";
import { axiosClient } from "../../lib/axios/axios.config";
import { AiFillStar } from "react-icons/ai";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import queryString from "query-string";
import ReactPaginate from "react-paginate";
import Brand from "../../components/Brand";
import SideBar from "../../layouts/Sidebar/SideBar";

const ProductShop = () => {
  const { shopId } = useParams();
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  let params = queryString.parse(location.search);

  const fetchProducts = async (shopId, params) => {
    const res = await axiosClient.get(`${endpoints.shop}${shopId}/products`, {
      params: {
        kw: params.kw ? params.kw : null,
        sortBy: params.sortBy ? params.sortBy : null,
        order: params.order ? params.order : null,
        fP: params.fP ? params.fP : null,
        tP: params.tP ? params.tP : null,
        cate: params.cate ? params.cate : null,
        page: params.page ? params.page : 1,
      },
    });
    setProducts(res.data);
  };

  const handlePageClick = async (data) => {
    let url = location.search.split("&");

    if (url[0] === "" || (url.length === 1 && url[0].includes("page"))) {
      url = `?page=${data.selected + 1}`;
    } else if (url.length > 1 && url[url.length - 1].includes("page")) {
      url[url.length - 1] = `page=${data.selected + 1}`;
      url = url.join("&");
    } else {
      url.push(`page=${data.selected + 1}`);
      url = url.join("&");
    }

    navigate(`${location.pathname}${url}`);
  };

  useEffect(() => {
    fetchProducts(shopId, params);
    console.log("useEffect in Shop");
  }, [location]);

  return (
    <>
      <Brand shopId={shopId} layout="horizontal" />
      <div className="flex">
        <SideBar />
        <div className="container__products grow">
          {location.pathname === "/" || (
            <div className="product__filter px-5 h-12 flex items-center border-b border-[light-gray]">
              <ul className="flex">
                <li className="filter__item mr-5 ">
                  <Link
                    to={`${location.pathname}?${
                      params.kw ? `kw=${params.kw}&` : ""
                    }${params.cate ? `cate=${params.cate}&` : ""}${
                      params.fP ? `fP=${params.fP}&` : ""
                    }${
                      params.tP ? `tP=${params.tP}&` : ""
                    }sortBy=id&order=desc`}
                  >
                    Hàng mới
                  </Link>
                </li>

                <li className="filter__item mr-5">
                  {" "}
                  <Link
                    to={`${location.pathname}?${
                      params.kw ? `kw=${params.kw}&` : ""
                    }${params.cate ? `cate=${params.cate}&` : ""}${
                      params.fP ? `fP=${params.fP}&` : ""
                    }${
                      params.tP ? `tP=${params.tP}&` : ""
                    }sortBy=name&order=desc`}
                  >
                    sắp xếp theo tên
                  </Link>
                </li>
                <li className="filter__item mr-5">
                  {" "}
                  <Link
                    to={`${location.pathname}?${
                      params.kw ? `kw=${params.kw}&` : ""
                    }${params.cate ? `cate=${params.cate}&` : ""}${
                      params.fP ? `fP=${params.fP}&` : ""
                    }${
                      params.tP ? `tP=${params.tP}&` : ""
                    }sortBy=price&order=asc`}
                  >
                    giá thấp đến cao
                  </Link>
                </li>
                <li className="filter__item mr-5">
                  <Link
                    to={`${location.pathname}?${
                      params.kw ? `kw=${params.kw}&` : ""
                    }${params.cate ? `cate=${params.cate}&` : ""}${
                      params.fP ? `fP=${params.fP}&` : ""
                    }${
                      params.tP ? `tP=${params.tP}&` : ""
                    }sortBy=price&order=desc`}
                  >
                    giá cao đến thấp
                  </Link>
                </li>
              </ul>
            </div>
          )}

          <div className="flex flex-wrap">
            {products.products?.map((p) => (
              <div
                key={p.id}
                className="flex flex-col bg-white w-[20%] p-3 mb-3 hover:shadow-product"
              >
                <Link to={`/${p.id}`}>
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
          </div>
          <ReactPaginate
            previousLabel={"Trước"}
            nextLabel={"Sau"}
            breakLabel={"..."}
            pageCount={
              products.productAmount ? Math.ceil(products.productAmount / 2) : 0
            }
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={"pagination justify-content-center"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"active"}
          />
        </div>
      </div>
    </>
  );
};

export default ProductShop;