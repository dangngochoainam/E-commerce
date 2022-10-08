import React, { useEffect, useState } from "react";
import { endpoints } from "../../configs/Apis";
import { axiosClient } from "../../lib/axios/axios.config";

const Comment = ({ productId }) => {
  const [inputComment, setInputComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    console.log("useEffect Comment");
    const getComments = async () => {
      const data = await axiosClient.get(
        `${endpoints.products}${productId}/comments`
      );
      setComments(data);
    };
    getComments();
  }, [productId]);

  return (
    <>
      <div className="product__comment p-2">
        <div className="comment-input mb-5">
          <h3 className="capitalize text-xl mb-3">
            bình luận về <strong>trí tuệ do thái</strong>
          </h3>
          <form className="w-full">
            <textarea
              value={inputComment}
              onChange={(e) => setInputComment(e.target.value)}
              className="w-full border rounded border-gray-200 outline-none px-4 py-3"
            ></textarea>
            <input
              className="px-5 py-2 bg-blue-600 rounded-sm text-white cursor-pointer"
              type="submit"
              value="Gửi"
            />
          </form>
        </div>
        <div className="comment-list">
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-center mb-8">
              <img
                src={comment.user.avatar}
                alt="avatar"
                className="self-start w-12 h-12 rounded-full object-cover"
              />
              <div className="ml-5">
                <div className="pr-10 px-5 py-2 bg-slate-200 rounded-2xl text-base">
                  <p>
                    <strong>{`${comment.user.firstname} ${comment.user.lastname}`}</strong>
                  </p>
                  <p>{comment.content}</p>
                </div>
                <div className="text-sm text-gray-800 ml-5 mt-2">
                  <span>
                    <button>Phản hồi</button>
                  </span>
                  <span className="text-xs text-gray-500 ml-3">
                    {comment.createdAt}
                  </span>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </>
  );
};

export default Comment;
