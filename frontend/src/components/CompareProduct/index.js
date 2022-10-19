import { compareProduct } from "../../utils/apiProduct";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { formatMoney } from "../../utils";
import { FaStar } from "react-icons/fa";

const CompareProduct = () => {
  const productCompare = useSelector((state) => state.productCompare.products);
  const [products, setProducts] = useState([]);
  const fetchAPI = async () => {
    try {
      const res = await compareProduct(
        productCompare[0].id,
        productCompare[1].id
      );
      console.log(res);

      if (res.status === 200) {
        setProducts(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAPI();
  }, [productCompare]);

  return (
    <>
      {products.length === 0 ? (
        <div>
          <h3 className="text-center xl:text-2xl my-3">
            Chưa thêm sản phẩm vào để so sánh
          </h3>
        </div>
      ) : (
        <section className="px-6">
          <h4 className="text-center text-blue-700 text-2xl my-5">
            So sánh sản phẩm
          </h4>

          <div className="flex border py-3 border-solid border-gray-200">
            {products.map((product) => (
              <>
                <div className="w-6/12 border-r border-solid border-gray-200 px-3">
                  <div className="w-40 h-48 mx-auto">
                    <img
                      className="w-full h-full object-cover"
                      src={product.image}
                      alt="Ảnh sản phẩm"
                    />
                  </div>
                  <div className="pl-5 text-light-gray">
                    <h5 className="font-bold xl:text-2xl capitalize text-black text-center my-3">
                      {product.name}
                    </h5>
                    <ul className="">
                      <li>
                        <span className="text-light-gray">Giá: </span>
                        <span className="text-price-color font-bold">
                          {formatMoney(product.price)}{" "}
                          <span className="underline"> đ</span>
                        </span>
                      </li>
                      <li className="flex items-center">
                        <span>Điểm đánh giá: </span>
                        <span className="font-bold ml-1">
                          {" "}
                          {product.rate} / 5
                        </span>{" "}
                        <span className="flex ml-2">
                          <FaStar color="rgb(253, 216, 54)" />
                          <FaStar color="rgb(253, 216, 54)" />
                          <FaStar color="rgb(253, 216, 54)" />
                          <FaStar color="rgb(253, 216, 54)" />
                          <FaStar color="rgb(253, 216, 54)" />
                        </span>
                      </li>
                    </ul>
                    <ul className="">
                      <li>
                        <span>Số lượng tồn kho: </span>
                        <span className="font-bold">{product.unitInStock}</span>
                      </li>
                      <li>
                        <span>Số lượng đã bán: </span>
                        <span className="font-bold">
                          {product.totalProductSold}
                        </span>
                      </li>
                    </ul>
                    <ul className="">
                      <li>
                        <span>Tên cửa hàng: </span>
                        <span className="font-bold">{product.shopName}</span>
                      </li>
                      <li className="flex items-center">
                        <span>Điểm đánh giá của cửa hàng: </span>
                        <span className="font-bold ml-1">
                          {product.shopRate} / 5
                        </span>
                        <span className="flex ml-2">
                          <FaStar color="rgb(253, 216, 54)" />
                          <FaStar color="rgb(253, 216, 54)" />
                          <FaStar color="rgb(253, 216, 54)" />
                          <FaStar color="rgb(253, 216, 54)" />
                          <FaStar color="rgb(253, 216, 54)" />
                        </span>
                      </li>
                    </ul>
                    <div className="mt-5">
                      <span className="font-bold">Mô tả: </span>
                      <span>{product.description}</span>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default CompareProduct;
