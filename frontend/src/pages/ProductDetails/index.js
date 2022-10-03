import { Link } from "react-router-dom";
import {
  AiFillStar,
  AiOutlinePlus,
  AiOutlineFileProtect,
  AiOutlineLike,
  AiOutlineRollback,
} from "react-icons/ai";
import { BsShop } from "react-icons/bs";
import { useState } from "react";
import Review from "../../components/Review";
import Comment from "../../components/Comment";
const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  return (
    <>
      <main className="">
        <section className=" px-3 py-2 flex">
          <div className="h-[445px] w-[445px]">
            <img
              className="w-full h-full object-cover"
              src="https://res.cloudinary.com/de5pwc5fq/image/upload/v1664435281/paul-pastourmatzis-ysA6qL8j-OI-unsplash_wytv3q.jpg"
              alt="Ảnh sản phẩm"
            />
          </div>
          <div className="line w-[1px] bg-gray-200 mx-4"></div>
          <div className=" text-character-color grow">
            <div className="header py-3">
              <p>
                Tác giả:
                <span className="text-blue-600 opacity-95 ml-2">Eran Katz</span>
              </p>
              <h1 className="text-xl capitalize text-character-color mb-2">
                trí tuệ do thái (tái bản 2018)
              </h1>
              <div className="product__review flex items-center text-sm">
                <div className=" flex pr-1 review__rating">
                  <AiFillStar color="rgb(253, 216, 54)" />
                  <AiFillStar color="rgb(253, 216, 54)" />
                  <AiFillStar color="rgb(253, 216, 54)" />
                  <AiFillStar color="rgb(253, 216, 54)" />
                  <AiFillStar />
                </div>
                <span className="text-light-gray mb-">
                  <Link to="/">(Xem 140 đánh giá)</Link>
                </span>
                <div className="mx-2 h-3 w-[0.5px] bg-light-gray"></div>
                <span className="text-light-gray">Đã bán 932</span>
              </div>
            </div>
            <div className="body flex">
              <div className="left w-8/12 mr-4">
                <div className="px-4 pb-5 product__price flex h-20 bg-[#f3f3f3] items-end">
                  <p className="text-price-color text-3xl font-medium">
                    109.850 ₫
                  </p>
                  <p className="text-light-gray line-through ml-2">118.000 ₫</p>
                  <p className="text-promotion-color font-medium ml-2">-7%</p>
                </div>
                <div className="mt-4  border-t border-gray-200 py-4">
                  <p className="text-lg mb-2">Số lượng</p>
                  <div className="flex items-center">
                    <div className="flex items-center">
                      <button
                        className="border border-gray-300 h-[26px]"
                        onClick={() => setQuantity((current) => current - 1)}
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
                        onClick={() => setQuantity((current) => current + 1)}
                      >
                        <img
                          className="w-full h-full object-cover"
                          src="https://frontend.tikicdn.com/_desktop-next/static/img/pdp_revamp_v2/icons-add.svg"
                          alt="Ảnh nút tăng"
                        />
                      </button>
                    </div>
                    <span className="text-light-gray ml-3">
                      100 sản phẩm có sẵn
                    </span>
                  </div>
                  <div className="mt-3 flex w-full text-white">
                    <button className="w-3/4 bg-light-red  py-3 capitalize rounded-md outline-none mr-2">
                      chọn mua
                    </button>
                    <button className="w-1/4 text-blue-600 border border-blue-600 rounded-md outline-none">
                      Chat
                    </button>
                  </div>
                </div>
              </div>
              <div className="right w-4/12 border border-gray-200 rounded p-2">
                <div className="capitalize flex mb-5">
                  <img
                    className="w-8 h-12 object-cover"
                    src="https://res.cloudinary.com/de5pwc5fq/image/upload/v1664435281/paul-pastourmatzis-ysA6qL8j-OI-unsplash_wytv3q.jpg"
                    alt="Logo shop"
                  />
                  <div className="font-medium ml-5">
                    <p>Tên shop</p>
                    <img
                      className="object-contain h-5 w-14"
                      src="https://salt.tikicdn.com/cache/w100/ts/upload/e8/6a/e3/7f998ef1eb5ab0536aac53f02a698c8a.png.webp"
                      alt="Độ tin cậy"
                    />
                  </div>
                </div>
                <div className="flex justify-between capitalize mb-5">
                  <div>
                    <div className="font-medium flex items-center">
                      4.9 / 5
                      <span className="pl-1">
                        <AiFillStar color="rgb(253, 216, 54)" />
                      </span>
                    </div>
                    <p className="text-light-gray text-[12px] text-center">
                      3.5k+
                    </p>
                  </div>
                  <div>
                    <div className="font-medium  text-center">3.1k+</div>
                    <p className="text-light-gray text-[12px] text-center">
                      theo dõi
                    </p>
                  </div>
                  <div>
                    <div className="font-medium text-center">93%</div>
                    <p className="text-light-gray text-[12px] text-center">
                      phản hồi chat
                    </p>
                  </div>
                </div>
                <div className="flex justify-between  text-sm  text-dark-blue capitalize font-medium mb-5">
                  <span className="inline-block w-[48%] px-3 py-1  border border-blue-600 rounded">
                    <Link className="flex items-center" to="/">
                      <span className="mr-2">
                        <BsShop />
                      </span>
                      xem shop
                    </Link>
                  </span>
                  <span className="inline-block  w-[48%] px-3 py-1  border border-blue-600 rounded">
                    <Link className="flex items-center" to="/">
                      <span className="mr-2">
                        <AiOutlinePlus />
                      </span>
                      Theo dõi
                    </Link>
                  </span>
                </div>
                <div className="flex justify-between p-2">
                  <div className="flex flex-col items-center text-character-color">
                    <span className="text-blue-400 text-3xl">
                      <AiOutlineFileProtect />
                    </span>
                    <span className="text-center mt-2 text-sm">
                      Hoàn tiền <strong>111%</strong> nếu hàng giả
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-blue-400 text-3xl">
                      <AiOutlineLike />
                    </span>
                    <span className="text-center mt-2 text-sm">
                      Mở hộp kiểm tra nhận hàng
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-blue-400 text-3xl">
                      <AiOutlineRollback />
                    </span>
                    <span className="text-center mt-2 text-sm">
                      Đổi trả trong <strong>30 ngày</strong> nếu sp lỗi
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="bg-main h-5"></div>

        <div className="product__description p-2">
          <h3 className="capitalize text-xl mb-3">mô tả sản phẩm</h3>
          <p className="text-character-color">
            Trí tuệ Do Thái là một cuốn sách tư duy đầy tham vọng trong việc
            nâng cao khả năng tự học tập, ghi nhớ và phân tích - những điều đã
            khiến người Do Thái vượt trội lên, chiếm lĩnh những vị trí quan
            trọng trong ngành truyền thông, ngân hàng và những giải thưởng sáng
            tạo trên thế giới. Tuy là một cuốn sách nhỏ nhưng Trí Tuệ Do Thái
            lại mang trong mình tri thức về một dân tộc có thể nhỏ về số lượng
            nhưng vĩ đại về trí tuệ và tài năng. Cuốn sách không chỉ lý giải lý
            do vì sao những người Do Thái trên thế giới lại thông minh và giàu
            có, mà còn đặc tả con đường thành công của một người Do Thái -
            Jerome cùng những triết lý được đúc kết đầy giá trị. Trí Tuệ Do Thái
            không dừng lại ở giới hạn của một cuốn sách triết lý hay kỹ năng.
            Thông qua Jerome, một kẻ lông bông thích la cà, tác giả đưa người
            đọc vào một chuyến khám phá về trí tuệ của người Do Thái, từ đó khơi
            ra những giới hạn để người đọc có thể tự khai phá trí tuệ bản thân
            với "Năm nguyên tắc" và "Mười lăm gợi ý". Đây sẽ là những bài học
            quý giá dành cho những ai muốn tồn tại và phát triển mạnh mẽ, không
            chỉ với con đường thành công của riêng mình. Không được viết như một
            cuốn sách kỹ năng khô khan, Trí Tuệ Do Thái được dựng lên bằng một
            câu chuyện và rồi cũng khép lại với một cái kết mở, nơi những người
            Do Thái đang không ngừng đối mặt với cuộc sống và chinh phục nó. Giá
            sản phẩm trên Tiki đã bao gồm thuế theo luật hiện hành. Bên cạnh đó,
            tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát
            sinh thêm chi phí khác như phí vận chuyển, phụ phí hàng cồng kềnh,
            thuế nhập khẩu (đối với đơn hàng giao từ nước ngoài có giá trị trên
            1 triệu đồng).....
          </p>
        </div>
        <div className="bg-main h-5"></div>
        <Review />
        <div className="bg-main h-5"></div>
        <Comment />
      </main>
    </>
  );
};

export default ProductDetails;
