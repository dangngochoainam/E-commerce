import React from "react";
import { BiDownArrow } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import { IoMdGitCompare } from "react-icons/io";
import { removeProduct, removeAll } from "../../lib/redux/productSlide";

const ButtonCompareProduct = () => {
  const [showModal, setShowModal] = React.useState(false);
  const products = useSelector((state) => state.productCompare.products);
  const dispatch = useDispatch();
  return (
    <>
      {!showModal && (
        <button
          className="fixed bottom-0 left-0 bg-white-500 text-blue-400 active:bg-white-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={() => setShowModal(true)}
        >
          <span className="flex items-center">
            <IoMdGitCompare color="text-blue-400" className="mr-2" />
            So sánh
          </span>
        </button>
      )}

      {showModal ? (
        <>
          <div className="fixed bottom-0 left-10">
            <div className="relative">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg  flex flex-col w-full bg-slate-100 outline-none focus:outline-none p-3">
                {/*header*/}
                <div className="absolute bottom-[95%] right-0">
                  <button
                    className="bg-transparent border-0 text-black text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-gray-200 h-6 w-12 px-3 text-2xl block outline-none focus:outline-none">
                      <BiDownArrow />
                    </span>
                  </button>
                </div>
                <div className="flex justify-between">
                  <ul className="flex">
                    {products.map((p, idx) => (
                      <li
                        key={idx}
                        className="px-2 border-r border-solid border-gray-200 relative"
                      >
                        <div className="w-28 h-28">
                          <img
                            className="w-full h-full object-cover"
                            src={p.image}
                            alt="Ảnh sản phẩm"
                          />
                        </div>
                        <h4>{p.name}</h4>

                        <button
                          onClick={() => dispatch(removeProduct(p))}
                          className="absolute bottom-full right-0 cursor-pointer"
                        >
                          {<AiOutlineClose />}
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-col justify-center">
                    <Link
                      to="/compareProduct"
                      className="text-center block bg-blue-500 text-white rounded-lg px-2 py-1 mb-2"
                    >
                      So sánh ngay
                    </Link>
                    <button
                      className="block text-blue-700"
                      onClick={() => dispatch(removeAll())}
                    >
                      Xóa tất cả sản phẩm
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default ButtonCompareProduct;
