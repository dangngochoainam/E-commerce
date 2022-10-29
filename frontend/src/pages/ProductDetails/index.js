import { Link, useParams } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import Review from '../../components/Review';
import Comment from '../../components/Comment';
import Brand from '../../components/Brand';
import { counterProductInCart, formatMoney } from '../../utils';
import { getProductByID } from '../../utils/apiProduct';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { countProduct } from '../../lib/redux/cartSlide';

const ProductDetails = () => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState();
  const { productId } = useParams();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const fetchAPI = async () => {
    const res = await getProductByID(productId);
    setProduct(res.data);
  };

  const renderStar = (star) => {
    let starJSX = [];
    for (let i = 0; i < 5; i++) {
      if (star > i) {
        starJSX = [...starJSX, <AiFillStar color="rgb(253, 216, 54)" />];
      } else {
        starJSX = [...starJSX, <AiFillStar />];
      }
    }
    return starJSX;
  };

  const addToCart = (product, quantity) => {
    if (quantity > product.unitInStock || quantity < 1) {
      toast.error('Vui lòng nhập lại số lượng cần mua', {
        theme: 'colored',
      });
      return;
    }

    const cart = JSON.parse(localStorage.getItem(`${currentUser.id}`)) || {};

    if (cart[`${product.id}`]) {
      cart[`${product.id}`].quantity += quantity;
    } else {
      cart[`${product.id}`] = { ...product, quantity };
    }

    localStorage.setItem(`${currentUser.id}`, JSON.stringify({ ...cart }));

    dispatch(
      countProduct(
        counterProductInCart(
          JSON.parse(localStorage.getItem(`${currentUser?.id}`)) || []
        )
      )
    );

    toast.success('Thêm thành công', { theme: 'colored' });
  };

  useEffect(() => {
    console.log('useEffect ProductDetails');
    fetchAPI();
  }, []);
  return (
    <>
      {product && (
        <main className="">
          <section className=" px-3 py-2 flex">
            <div className="h-[445px] w-[445px]">
              <img
                className="w-full h-full object-cover"
                src={product.image}
                alt="Ảnh sản phẩm"
              />
            </div>
            <div className="line w-[1px] bg-gray-200 mx-4"></div>
            <div className=" text-character-color grow">
              <div className="header py-3">
                {/* <p>
                  Tác giả:
                  <span className="text-blue-600 opacity-95 ml-2">
                    Eran Katz
                  </span>
                </p> */}
                <h1 className="text-xl capitalize text-character-color mb-2">
                  {product.name}
                </h1>
                <div className="product__review flex items-center text-sm">
                  <div className=" flex pr-1 review__rating">
                    {renderStar(parseInt(product.rate))}
                  </div>
                  <span className="text-light-gray mb-">
                    <Link to="/">(Xem {product.countReview} đánh giá)</Link>
                  </span>
                  <div className="mx-2 h-3 w-[0.5px] bg-light-gray"></div>
                  <span className="text-light-gray">
                    Đã bán {product.totalProductSold || 0}
                  </span>
                </div>
              </div>
              <div className="body flex">
                <div className="left w-8/12 mr-4">
                  <div className="px-4 pb-4 product__price flex h-20 bg-[#f3f3f3] items-end">
                    <p className="text-price-color text-3xl font-medium">
                      {formatMoney(product.price)}
                    </p>
                    <p className="text-light-gray line-through ml-2">
                      {formatMoney(product.price)} ₫
                    </p>
                    <p className="text-promotion-color font-medium ml-2">-7%</p>
                  </div>
                  <div className="mt-4  border-t border-gray-200 py-4">
                    <p className="text-lg mb-2">Số lượng</p>
                    <div className="flex items-center">
                      <div className="flex items-center">
                        <button
                          className="border border-gray-300 h-[26px]"
                          onClick={() =>
                            setQuantity((current) => {
                              if (current > 1) {
                                return current - 1;
                              }
                              return current;
                            })
                          }
                        >
                          <img
                            className="w-full h-full object-cover"
                            src="https://frontend.tikicdn.com/_desktop-next/static/img/pdp_revamp_v2/icons-remove.svg"
                            alt="Ảnh nút giảm"
                          />
                        </button>
                        <input
                          type="type"
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                          className="text-center outline-none w-7 border border-gray-300 focus:border-blue-400 focus:shadow-product"
                        />
                        <button
                          className="border border-gray-300 h-[26px] "
                          onClick={() =>
                            setQuantity((current) => {
                              if (current < product.unitInStock) {
                                return parseInt(current) + 1;
                              }
                              return current;
                            })
                          }
                        >
                          <img
                            className="w-full h-full object-cover"
                            src="https://frontend.tikicdn.com/_desktop-next/static/img/pdp_revamp_v2/icons-add.svg"
                            alt="Ảnh nút tăng"
                          />
                        </button>
                      </div>
                      <span className="text-light-gray ml-3">
                        {product.unitInStock} sản phẩm có sẵn
                      </span>
                    </div>
                    {currentUser ? (
                      <div className="mt-3 flex w-full text-white">
                        <button
                          className="w-3/4 bg-light-red  py-3 capitalize rounded-md outline-none mr-2"
                          onClick={() => addToCart(product, parseInt(quantity))}
                        >
                          chọn mua
                        </button>
                        <button className="w-1/4 text-blue-600 border border-blue-600 rounded-md outline-none">
                          Chat
                        </button>
                      </div>
                    ) : (
                      <p className="text-red-400 mt-5">Đăng nhập để mua hàng</p>
                    )}
                  </div>
                </div>
                <Brand shopId={product.shopId} />
              </div>
            </div>
          </section>
          <div className="bg-main h-5"></div>

          <div className="product__description p-2">
            <h3 className="capitalize text-xl mb-3">mô tả sản phẩm</h3>
            <p className="text-character-color">{product.description}</p>
          </div>
          <div className="bg-main h-5"></div>
          <Review product={product} />
          <div className="bg-main h-5"></div>
          <Comment product={product} />
        </main>
      )}
    </>
  );
};

export default ProductDetails;
