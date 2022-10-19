import { Link } from 'react-router-dom';
import { BsShop } from 'react-icons/bs';
import { IoIosArrowForward } from 'react-icons/io';
const Cart = () => {
  return (
    <>
      <section>
        <div className="container mx-auto mt-10">
          <div className="flex shadow-md my-10">
            <div className="w-3/4 px-10 py-10">
              <div className="flex justify-between border-b pb-8">
                <h1 className="font-semibold text-2xl">Giỏ hàng</h1>
                <h2 className="font-semibold text-2xl"> 3 sản phẩm</h2>
              </div>
              <div className="flex mt-10 mb-5">
                <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                  Sản phẩm
                </h3>
                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">
                  Số lượng
                </h3>
                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                  Đơn giá
                </h3>
                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">
                  Thành tiền
                </h3>
              </div>
              <div className="h-2 w-full bg-gray-200 mb-3"></div>
              <div className="order__shop">
                <Link to="/">
                  <span className="flex items-center font-medium my-3">
                    <BsShop className="mr-2" />
                    Tên cửa hàng
                    <IoIosArrowForward />
                  </span>
                </Link>
                <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                  <div className="flex w-2/5">
                    <div className="w-20">
                      <img
                        className="h-24"
                        src="https://drive.google.com/uc?id=18KkAVkGFvaGNqPy2DIvTqmUH_nk39o3z"
                        alt=""
                      />
                    </div>
                    <div className="flex flex-col justify-between ml-4 flex-grow">
                      <span className="font-bold text-sm">Iphone 6S</span>
                      <span className="text-red-500 text-xs">Apple</span>
                      <Link
                        to="#"
                        className="font-semibold hover:text-red-500 text-gray-500 text-xs"
                      >
                        Remove
                      </Link>
                    </div>
                  </div>

                  <div className="flex items-center justify-center w-1/5">
                    <button className="border border-gray-300 h-[26px]">
                      <img
                        className="w-full h-full object-cover"
                        src="https://frontend.tikicdn.com/_desktop-next/static/img/pdp_revamp_v2/icons-remove.svg"
                        alt="Ảnh nút giảm"
                      />
                    </button>
                    <input
                      type="type"
                      className="text-center outline-none w-7 border border-gray-300 focus:border-blue-400 focus:shadow-product"
                    />
                    <button className="border border-gray-300 h-[26px] ">
                      <img
                        className="w-full h-full object-cover"
                        src="https://frontend.tikicdn.com/_desktop-next/static/img/pdp_revamp_v2/icons-add.svg"
                        alt="Ảnh nút tăng"
                      />
                    </button>
                  </div>
                  <span className="text-center w-1/5 font-semibold text-sm">
                    $400.00
                  </span>
                  <span className="text-center w-1/5 font-semibold text-sm">
                    $400.00
                  </span>
                </div>
                <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                  <div className="flex w-2/5">
                    <div className="w-20">
                      <img
                        className="h-24"
                        src="https://drive.google.com/uc?id=18KkAVkGFvaGNqPy2DIvTqmUH_nk39o3z"
                        alt=""
                      />
                    </div>
                    <div className="flex flex-col justify-between ml-4 flex-grow">
                      <span className="font-bold text-sm">Iphone 6S</span>
                      <span className="text-red-500 text-xs">Apple</span>
                      <Link
                        to="#"
                        className="font-semibold hover:text-red-500 text-gray-500 text-xs"
                      >
                        Remove
                      </Link>
                    </div>
                  </div>

                  <div className="flex items-center justify-center w-1/5">
                    <button className="border border-gray-300 h-[26px]">
                      <img
                        className="w-full h-full object-cover"
                        src="https://frontend.tikicdn.com/_desktop-next/static/img/pdp_revamp_v2/icons-remove.svg"
                        alt="Ảnh nút giảm"
                      />
                    </button>
                    <input
                      type="type"
                      className="text-center outline-none w-7 border border-gray-300 focus:border-blue-400 focus:shadow-product"
                    />
                    <button className="border border-gray-300 h-[26px] ">
                      <img
                        className="w-full h-full object-cover"
                        src="https://frontend.tikicdn.com/_desktop-next/static/img/pdp_revamp_v2/icons-add.svg"
                        alt="Ảnh nút tăng"
                      />
                    </button>
                  </div>
                  <span className="text-center w-1/5 font-semibold text-sm">
                    $400.00
                  </span>
                  <span className="text-center w-1/5 font-semibold text-sm">
                    $400.00
                  </span>
                </div>
                <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                  <div className="flex w-2/5">
                    <div className="w-20">
                      <img
                        className="h-24"
                        src="https://drive.google.com/uc?id=18KkAVkGFvaGNqPy2DIvTqmUH_nk39o3z"
                        alt=""
                      />
                    </div>
                    <div className="flex flex-col justify-between ml-4 flex-grow">
                      <span className="font-bold text-sm">Iphone 6S</span>
                      <span className="text-red-500 text-xs">Apple</span>
                      <Link
                        to="#"
                        className="font-semibold hover:text-red-500 text-gray-500 text-xs"
                      >
                        Remove
                      </Link>
                    </div>
                  </div>

                  <div className="flex items-center justify-center w-1/5">
                    <button className="border border-gray-300 h-[26px]">
                      <img
                        className="w-full h-full object-cover"
                        src="https://frontend.tikicdn.com/_desktop-next/static/img/pdp_revamp_v2/icons-remove.svg"
                        alt="Ảnh nút giảm"
                      />
                    </button>
                    <input
                      type="type"
                      className="text-center outline-none w-7 border border-gray-300 focus:border-blue-400 focus:shadow-product"
                    />
                    <button className="border border-gray-300 h-[26px] ">
                      <img
                        className="w-full h-full object-cover"
                        src="https://frontend.tikicdn.com/_desktop-next/static/img/pdp_revamp_v2/icons-add.svg"
                        alt="Ảnh nút tăng"
                      />
                    </button>
                  </div>
                  <span className="text-center w-1/5 font-semibold text-sm">
                    $400.00
                  </span>
                  <span className="text-center w-1/5 font-semibold text-sm">
                    $400.00
                  </span>
                </div>
              </div>
              <div className="h-2 w-full bg-gray-200 mb-3"></div>

              <Link
                to="#"
                className="flex font-semibold text-indigo-600 text-sm mt-10"
              >
                <svg
                  className="fill-current mr-2 text-indigo-600 w-4"
                  viewBox="0 0 448 512"
                >
                  <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                </svg>
                Continue Shopping
              </Link>
            </div>

            <div id="summary" className="w-1/4 px-8 py-10">
              <h1 className="font-semibold text-2xl border-b pb-8">Đơn hàng</h1>
              <div className="flex justify-between mt-10 mb-5">
                <span className="font-semibold text-sm uppercase">
                  3 sản phẩm
                </span>
                <span className="font-semibold text-sm">300$</span>
              </div>
              <div className="h-2 w-full bg-gray-200 mb-3"></div>

              <div>
                <span className="font-medium mb-3 text-sm uppercase flex text-light-gray">
                  Giao tới
                  <button className="ml-auto text-blue-400">Thay đổi</button>
                </span>
                <span className="flex flex-col p-2 text-gray-600 w-full text-sm">
                  <span>Đặng Ngọc Hoài Nam 0382890580</span>
                  <span>
                    79/83 Bùi Quang Là, Phường 12, Quận Gò Vấp, Hồ Chí Minh
                  </span>
                </span>
              </div>
              <div className="h-2 w-full bg-gray-200 my-3"></div>

              <div className="pb-3">
                <label
                  htmlFor="promo"
                  className="font-semibold inline-block mb-3 text-sm uppercase"
                >
                  Mã khuyến mãi
                </label>
                <input
                  type="text"
                  id="promo"
                  placeholder="Enter your code"
                  className="p-2 text-sm w-full"
                />
              </div>
              <button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">
                Áp dụng
              </button>

              <div className="border-t mt-8">
                <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                  <span>Tổng tiền</span>
                  <span>$600</span>
                </div>
                <button className="bg-blue-500 font-semibold hover:bg-blue-600 py-3 text-sm text-white uppercase w-full">
                  Thanh toán
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
