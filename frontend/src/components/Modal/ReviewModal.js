import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { addReview } from "../../utils/apiReview";
import { toast } from "react-toastify";

const ReviewModal = ({ currentUser, product, fetchAPI }) => {
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [input, setInput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let review = { content: input, rate: rating, productId: product.id };
    try {
      const res = await addReview(currentUser, review);
      if (res.status === 201) {
        toast.success("Đánh giá thành công", { theme: "colored" });
        fetchAPI();
      }
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <button
        className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Đánh giá sản phẩm
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <div className="flex items-center">
                    <div>
                      <img
                        className="h-20 w-20"
                        src={product.image}
                        alt="Ảnh sản phẩm"
                      />
                    </div>
                    <div>
                      <p className="text-lg capitalize">{product.name}</p>
                      <div className="flex text-3xl">
                        {[...Array(5)].map((star, i) => {
                          const ratingValue = i + 1;
                          return (
                            <label key={i}>
                              <input
                                type="radio"
                                name="rating"
                                value={ratingValue}
                                onClick={() => setRating(ratingValue)}
                                onMouseOver={() => setHover(ratingValue)}
                                onMouseOut={() => setHover(null)}
                                className="hidden"
                              />
                              <FaStar
                                className="star"
                                color={
                                  ratingValue <= (hover || rating)
                                    ? "#ffc107"
                                    : "#e4e5e9"
                                }
                                size={50}
                              />
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black  text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p>Điều gì làm bạn hài lòng?</p>
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="w-full h-40 outline-none border border-solid border-gray-200 rounded-lg px-3 py-2"
                    placeholder="Hãy chia sẻ cảm nhận, đánh giá của bạn về sản phẩm"
                  ></textarea>
                  <button
                    className="bg-emerald-500 block text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ml-auto mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleSubmit}
                  >
                    Gửi
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default ReviewModal;
