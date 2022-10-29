import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { addComment, fetchComment } from '../../utils/apiComment';
import { toast } from 'react-toastify';
import { socket } from '../../utils';
import { getUserByProductID } from '../../utils/apiProduct';
import { createNotification } from '../../utils/apiNotification';

const Comment = ({ product }) => {
  const [inputComment, setInputComment] = useState('');
  const [comments, setComments] = useState([]);
  const currentUser = useSelector((state) => state.auth.currentUser);

  const fetchAPI = async () => {
    try {
      const res = await fetchComment(product.id);
      if (res.status === 200) setComments(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNotification = async (type, productID) => {
    const product = await getUserByProductID(productID);
    console.log({
      senderName: currentUser.username,
      receiverName: product.data.shop.seller.user.username,
      type,
    });
    socket.emit('sendNotification', {
      senderName: currentUser.username,
      receiverName: product.data.shop.seller.user.username,
      type,
    });
  };

  useEffect(() => {
    console.log('useEffect Comment');
    fetchAPI();
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await addComment(currentUser, {
        content: inputComment,
        productId: product.id,
      });

      if (res.status === 201) {
        toast.success('Bình luận thành công', { theme: 'colored' });
        fetchAPI();
        setInputComment('');
        handleNotification(
          `${currentUser.firstname} ${currentUser.lastname} đã bình luận trên sản phẩm ${product.name}`,
          product.id
        );
        await createNotification(currentUser, {
          type: 'PRODUCT',
          content: `${currentUser.firstname} ${currentUser.lastname} đã bình luận trên sản phẩm ${product.name}`,
          valueId: product.id,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="product__comment p-2">
        <div className="comment-input mb-5">
          <h3 className="capitalize text-xl mb-3">
            bình luận về <strong>trí tuệ do thái</strong>
          </h3>
          {currentUser ? (
            <form className="w-full" onSubmit={handleSubmit}>
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
          ) : (
            <p className="text-red-400 text-center">
              {' '}
              Vui lòng đăng nhập để bình luận
            </p>
          )}
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
