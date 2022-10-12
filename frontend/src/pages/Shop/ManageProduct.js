import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AiFillDelete } from "react-icons/ai";
import { GrEdit } from "react-icons/gr";
import { fetchProductOfShop } from "../../utils/apiShop";
import AddProductModal from "../../components/Modal/AddProductModal";
import ReactPaginate from "react-paginate";
import queryString from "query-string";

const ManageProduct = () => {
  const { shopId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  let params = queryString.parse(location.search);

  const fetchAPI = async () => {
    try {
      const res = await fetchProductOfShop(shopId, params.page);
      setProducts(res.data);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.data.error);
    }
  };

  useEffect(() => {
    fetchAPI();
  }, [location]);

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

  return (
    <div className="ml-3 grow">
      <h1 className="text-center xl:text-4xl text-green-400 my-3">
        Danh sách các sản phẩm của cửa hàng
      </h1>
      <AddProductModal setProduct={fetchAPI} />
      <div className="w-full overflow-hidden rounded-lg shadow-xs container__products">
        <div className="w-full overflow-x-auto">
          <table className="w-full whitespace-no-wrap">
            <thead className="">
              <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                <th className="px-1 py-2">Mã SP</th>
                <th className="px-1 py-2 xl:w-5/12">Tên SP</th>
                <th className="px-1 py-2 w-40">Giá</th>
                <th className="px-1 py-2">Đánh giá</th>
                <th className="px-1 py-2">Hàng trong kho</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
              {products.products &&
                products.products.map((product) => (
                  <>
                    <tr
                      key={product.id}
                      className="text-gray-700 dark:text-gray-400 w-full"
                    >
                      <td className="px-1 py-2">{product.id}</td>
                      <td className="px-1 py-2 text-xs">
                        <span className="whitespace-nowrap capitalize px-2 py-1 font-semibold leading-tight text-blue-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
                          {product.name}
                        </span>
                      </td>
                      <td className="px-1 py-2 text-sm font-medium text-price-color">
                        {String(
                          product.price
                            .toString()
                            .replace(/(.)(?=(\d{3})+$)/g, "$1,")
                        )}{" "}
                        <span class="underline mt-1">đ</span>
                      </td>

                      <td className="px-1 py-2 text-sm text-center font-bold">
                        {product.rate}
                      </td>
                      <td className="px-1 py-2 text-sm text-center font-bold">
                        {product.unitInStock}
                      </td>

                      <td className="px-1 py-2 text-sm ">
                        <button className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                          <GrEdit className="text-white" />
                        </button>
                      </td>
                      <td className="px-1 py-2 text-sm">
                        <button className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                          <AiFillDelete />
                        </button>
                      </td>
                    </tr>
                  </>
                ))}
            </tbody>
          </table>
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
        {/* <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
          <span className="col-span-2"></span>
          <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
            <nav aria-label="Table navigation">
              <ul className="inline-flex items-center">
                <li>
                  <button
                    className="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
                    aria-label="Previous"
                  >
                    <svg
                      aria-hidden="true"
                      className="w-4 h-4 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                        fillRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </li>
                <li>
                  <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                    1
                  </button>
                </li>
                <li>
                  <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                    2
                  </button>
                </li>
                <li>
                  <button className="px-3 py-1 text-white transition-colors duration-150 bg-purple-600 border border-r-0 border-purple-600 rounded-md focus:outline-none focus:shadow-outline-purple">
                    3
                  </button>
                </li>
                <li>
                  <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                    4
                  </button>
                </li>
                <li>
                  <span className="px-3 py-1">...</span>
                </li>
                <li>
                  <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                    8
                  </button>
                </li>
                <li>
                  <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                    9
                  </button>
                </li>
                <li>
                  <button
                    className="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
                    aria-label="Next"
                  >
                    <svg
                      className="w-4 h-4 fill-current"
                      aria-hidden="true"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                        fillRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </li>
              </ul>
            </nav>
          </span>
        </div> */}
      </div>
    </div>
  );
};

export default ManageProduct;
