import React, { useEffect, useState } from "react";
import { fetchReview } from "../../utils/apiReview";

export default function ListReviewModal({ product, rates }) {
  const [showModal, setShowModal] = React.useState(false);
  const [reviews, setReviews] = useState();

  const fetchAPI = async () => {
    try {
      const res = await fetchReview(product.id);
      if (res.status === 200) {
        setReviews(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAPI();
  }, [rates]);
  return (
    <>
      <button
        className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Các đánh giá của người dùng
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex  overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-2xl font-semibold">
                    Danh sách các đánh giá của người dùng
                  </h3>
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
                <div className="relative p-6 xl:h-[500px] overflow-auto flex-auto">
                  {reviews && (
                    <ul>
                      {reviews.map((review) => (
                        <li key={review.id} className="flex items-center mb-8">
                          <img
                            src={review.customer.user.avatar}
                            alt="avatar"
                            className="self-start w-12 h-12 rounded-full object-cover"
                          />
                          <div className="ml-5">
                            <div className="pr-10 px-5 py-2 bg-slate-200 rounded-2xl text-base">
                              <p>
                                <strong>{`${review.customer.user.firstname} ${review.customer.user.lastname}`}</strong>
                              </p>
                              <p>
                                Điểm đánh giá: {review.rate} - {review.content}
                              </p>
                            </div>
                            <div className="text-sm text-gray-800 ml-5 mt-2">
                              <span>
                                <button>Phản hồi</button>
                              </span>
                              <span className="text-xs text-gray-500 ml-3">
                                {review.createdAt}
                              </span>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
