import { Link } from 'react-router-dom';
import { BsShop } from 'react-icons/bs';
import { IoIosArrowForward } from 'react-icons/io';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  counterProductInCart,
  countTotalPriceInCart,
  formatMoney,
} from '../../utils/index';
import { toast } from 'react-toastify';
import { countProduct } from '../../lib/redux/cartSlide';
import { buy } from '../../utils/apiOrder';
import Stripe from '../../components/Stripe';

const Cart = () => {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.auth.currentUser);
  const totalProduct = useSelector((state) => state.cart.totalProduct);
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem(`${currentUser?.id}`)) || {}
  );

  const handleQuantity = (product, quantity) => {
    if (quantity < 0) {
      toast.error('Mời bạn nhập lại số lượng', { theme: 'colored' });
      return 1;
    }

    setCart((preState) => {
      const temp = { ...preState };

      temp[`${product.id}`] = { ...product, quantity: quantity };

      localStorage.setItem(`${currentUser.id}`, JSON.stringify({ ...temp }));

      dispatch(
        countProduct(
          counterProductInCart(
            JSON.parse(localStorage.getItem(`${currentUser?.id}`)) || []
          )
        )
      );

      return temp;
    });
  };

  const hanldeRemove = (product) => {
    setCart((preState) => {
      const temp = { ...preState };

      delete temp[product.id];

      localStorage.setItem(`${currentUser.id}`, JSON.stringify({ ...temp }));

      dispatch(
        countProduct(
          counterProductInCart(
            JSON.parse(localStorage.getItem(`${currentUser?.id}`)) || []
          )
        )
      );

      return temp;
    });
  };

  const handlePurchase = async (address, payment, shopId, cart) => {
    const temp = Object.values(
      JSON.parse(localStorage.getItem(currentUser.id))
    )[0]?.shopId;

    const order = {
      shipAddress: address,
      payment: payment,
      shopId: temp,
    };

    const orderDetails = Object.values(cart).reduce((acc, item) => {
      const detail = {
        quantity: item.quantity,
        unitPrice: item.price,
        promotionId: 0,
        productId: item.id,
      };

      return [...acc, detail];
    }, []);

    order.orderDetails = orderDetails;

    try {
      const res = await buy(currentUser, order);
      if (res.status === 200) {
        toast.success('Đặt hàng thành công', { theme: 'colored' });

        setCart({});

        localStorage.setItem(`${currentUser.id}`, JSON.stringify({}));

        dispatch(
          countProduct(
            counterProductInCart(
              JSON.parse(localStorage.getItem(`${currentUser?.id}`)) || []
            )
          )
        );
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.data.error, { theme: 'colored' });
    }
  };

  const handleCheckOut = async () => {
    handlePurchase(currentUser.address, 'Thanh toán bằng tiền mặt', null, cart);
  };

  useEffect(() => {
    console.log('useEffect in Cart');
    setCart(JSON.parse(localStorage.getItem(`${currentUser?.id}`)) || {});
  }, [currentUser]);

  return (
    <>
      <section>
        {currentUser ? (
          <>
            <div className="container mx-auto mt-10">
              <div className="flex shadow-md my-10">
                <div className="w-3/4 px-10 py-10">
                  <div className="flex justify-between border-b pb-8">
                    <h1 className="font-semibold text-2xl">Giỏ hàng</h1>
                    <h2 className="font-semibold text-2xl">
                      {' '}
                      {totalProduct} sản phẩm
                    </h2>
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
                    {Object.values(cart).map((product) => {
                      return (
                        <>
                          <div
                            key={product.id}
                            className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5"
                          >
                            <div className="flex w-2/5">
                              <div className="w-20">
                                <img
                                  className="h-24"
                                  src={product.image}
                                  alt="Ảnh sản phẩm"
                                />
                              </div>
                              <div className="flex flex-col justify-between ml-4 flex-grow">
                                <span className="font-bold text-sm capitalize">
                                  {product.name}
                                </span>
                                <span className="text-red-500 text-xs">
                                  {product.shop.name}
                                </span>
                                <button
                                  onClick={() => hanldeRemove(product)}
                                  className="text-left font-semibold hover:text-red-500 text-gray-500 text-xs"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>

                            <div className="flex items-center justify-center w-1/5">
                              <button
                                className="border border-gray-300 h-[26px]"
                                onClick={(e) => {
                                  handleQuantity(
                                    product,
                                    parseInt(product.quantity) - 1
                                  );
                                }}
                              >
                                <img
                                  className="w-full h-full object-cover"
                                  src="https://frontend.tikicdn.com/_desktop-next/static/img/pdp_revamp_v2/icons-remove.svg"
                                  alt="Ảnh nút giảm"
                                />
                              </button>
                              <input
                                type="type"
                                value={cart[`${product.id}`].quantity}
                                onChange={(e) =>
                                  handleQuantity(product, e.target.value)
                                }
                                className="text-center outline-none w-7 border border-gray-300 focus:border-blue-400 focus:shadow-product"
                              />
                              <button
                                className="border border-gray-300 h-[26px] "
                                onClick={(e) => {
                                  handleQuantity(
                                    product,
                                    parseInt(product.quantity) + 1
                                  );
                                }}
                              >
                                <img
                                  className="w-full h-full object-cover"
                                  src="https://frontend.tikicdn.com/_desktop-next/static/img/pdp_revamp_v2/icons-add.svg"
                                  alt="Ảnh nút tăng"
                                />
                              </button>
                            </div>
                            <span className="text-center w-1/5 font-semibold text-sm">
                              {formatMoney(product.price)}
                            </span>
                            <span className="text-center w-1/5 font-semibold text-sm">
                              {formatMoney(product.price * product.quantity)}
                            </span>
                          </div>
                        </>
                      );
                    })}

                    {/*
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
                    </div> */}
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
                  <h1 className="font-semibold text-2xl border-b pb-8">
                    Đơn hàng
                  </h1>
                  <div className="flex justify-between mt-10 mb-5">
                    <span className="font-semibold text-sm uppercase">
                      {totalProduct} sản phẩm
                    </span>
                    <span className="font-semibold text-sm text-price-color">
                      {formatMoney(countTotalPriceInCart(cart))}{' '}
                      <span className="underline">đ</span>
                    </span>
                  </div>
                  <div className="h-2 w-full bg-gray-200 mb-3"></div>

                  <div>
                    <span className="font-medium mb-3 text-sm uppercase flex text-light-gray">
                      Giao tới
                      <button className="ml-auto text-blue-400">
                        Thay đổi
                      </button>
                    </span>
                    <span className="flex flex-col p-2 text-gray-600 w-full text-sm">
                      <span>
                        {currentUser.firstname} {currentUser.lastname}{' '}
                        {currentUser.phone}
                      </span>
                      <span>{currentUser.address}</span>
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
                    <div className="flex font-semibold justify-between py-6 text-xl uppercase">
                      <span>Tổng tiền</span>
                      <span className="text-price-color">
                        {formatMoney(countTotalPriceInCart(cart))}{' '}
                        <span className="underline lowercase">đ</span>
                      </span>
                    </div>
                    <button
                      className="bg-blue-500 font-semibold hover:bg-blue-600 py-3 text-sm text-white uppercase w-full"
                      onClick={() =>
                        handlePurchase(
                          currentUser.address,
                          'Thanh toán bằng tiền mặt',
                          null,
                          cart
                        )
                      }
                    >
                      Thanh toán
                    </button>
                    <Stripe
                      handleCheckOut={handleCheckOut}
                      currentUser={currentUser}
                      amount={Math.round(countTotalPriceInCart(cart) / 24832)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div>
            <p className="text-red-400 mt-5 text-center">
              Đăng nhập để mua hàng
            </p>
          </div>
        )}
      </section>
    </>
  );
};

export default Cart;
