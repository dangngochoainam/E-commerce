import React from "react";
import { AiFillStar } from "react-icons/ai";
import "./style.scss";


const Review = () => {
  return (
    <>
      <div className="product__review p-2">
        <h3 className="capitalize text-xl mb-3">
          đánh giá - nhận xét từ khách hàng
        </h3>
        <div className="flex">
          <div>
            <div className="review-rating__summary flex items-center mb-4">
              <div className="text-3xl font-bold mr-3">4.8</div>
              <div>
                <div className="flex items-center">
                  <AiFillStar color="rgb(253, 216, 54)" />
                  <AiFillStar color="rgb(253, 216, 54)" />
                  <AiFillStar color="rgb(253, 216, 54)" />
                  <AiFillStar color="rgb(253, 216, 54)" />
                  <AiFillStar color="rgb(253, 216, 54)" />
                </div>
                <p>29 nhận xét</p>
              </div>
            </div>
            <div className="review-rating__detail">
              <div className="flex items-center">
                <div className="flex items-center mr-2">
                  <AiFillStar color="rgb(253, 216, 54)" />
                  <AiFillStar color="rgb(253, 216, 54)" />
                  <AiFillStar color="rgb(253, 216, 54)" />
                  <AiFillStar color="rgb(253, 216, 54)" />
                  <AiFillStar color="rgb(253, 216, 54)" />
                </div>
                <div className="review-rating__detail--process h-1 w-32 bg-gray-200 mr-2 rounded-sm"></div>
                <span>24</span>
              </div>
              <div className="flex items-center">
                <div className="flex items-center mr-2">
                  <AiFillStar color="rgb(253, 216, 54)" />
                  <AiFillStar color="rgb(253, 216, 54)" />
                  <AiFillStar color="rgb(253, 216, 54)" />
                  <AiFillStar color="rgb(253, 216, 54)" />
                  <AiFillStar />
                </div>
                <div className="review-rating__detail--process h-1 w-32 bg-gray-200 mr-2 rounded-sm"></div>
                <span>24</span>
              </div>
              <div className="flex items-center">
                <div className="flex items-center mr-2">
                  <AiFillStar color="rgb(253, 216, 54)" />
                  <AiFillStar color="rgb(253, 216, 54)" />
                  <AiFillStar color="rgb(253, 216, 54)" />
                  <AiFillStar />
                  <AiFillStar />
                </div>
                <div className="review-rating__detail--process h-1 w-32 bg-gray-200 mr-2 rounded-sm"></div>
                <span>24</span>
              </div>
              <div className="flex items-center">
                <div className="flex items-center mr-2">
                  <AiFillStar color="rgb(253, 216, 54)" />
                  <AiFillStar color="rgb(253, 216, 54)" />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                </div>
                <div className="review-rating__detail--process h-1 w-32 bg-gray-200 mr-2 rounded-sm"></div>
                <span>24</span>
              </div>
              <div className="flex items-center">
                <div className="flex items-center mr-2">
                  <AiFillStar color="rgb(253, 216, 54)" />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                </div>
                <div className="review-rating__detail--process h-1 w-32 bg-gray-200 mr-2 rounded-sm"></div>
                <span>24</span>
              </div>
            </div>
          </div>
          <div className="ml-10">Đánh giá</div>
        </div>
      </div>
    </>
  );
};

export default Review;
