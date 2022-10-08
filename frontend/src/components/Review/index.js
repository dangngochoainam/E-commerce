import React, { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { endpoints } from "../../configs/Apis";
import { axiosClient } from "../../lib/axios/axios.config";
import "./style.scss";

const Review = ({ rate, productId }) => {
  const [rates, setRates] = useState();

  useEffect(() => {
    console.log("useEffect Review");
    const countRateOfProduct = async () => {
      const data = await axiosClient.get(
        `${endpoints.reviews}rateOfProduct/${productId}`
      );

      const totalRate = data.reduce((acc, item) => acc + item.rateCount, 0);
      setRates({ ...data, totalRate });
    };
    countRateOfProduct();
  }, [productId]);

  let ratePercent, percentTailwind;
  if (rates) {
    ratePercent = [
      {
        rate: 5,
        percent: `after:w-[${parseInt(
          ((rates["0"]?.rateCount || 0) / rates.totalRate) * 100
        )}%]`,
      },
      {
        rate: 4,
        percent: `after:w-[${parseInt(
          ((rates["1"]?.rateCount || 0) / rates.totalRate) * 100
        )}%]`,
      },
      {
        rate: 3,
        percent: `after:w-[${parseInt(
          ((rates["2"]?.rateCount || 0) / rates.totalRate) * 100
        )}%]`,
      },
      {
        rate: 2,
        percent: `after:w-[${parseInt(
          ((rates["3"]?.rateCount || 0) / rates.totalRate) * 100
        )}%]`,
      },
      {
        rate: 1,
        percent: `after:w-[${parseInt(
          ((rates["4"]?.rateCount || 0) / rates.totalRate) * 100
        )}%]`,
      },
    ];

    percentTailwind = [
      ratePercent[0].percent,
      ratePercent[1].percent,
      ratePercent[2].percent,
      ratePercent[3].percent,
      ratePercent[4].percent,
    ];
  }

  return (
    <>
      {rates && (
        <div className="product__review p-2">
          <h3 className="capitalize text-xl mb-3">
            đánh giá - nhận xét từ khách hàng
          </h3>
          <div className="flex">
            <div>
              <div className="review-rating__summary flex items-center mb-4">
                <div className="text-3xl font-bold mr-3">{rate}</div>
                <div>
                  <div className="flex items-center">
                    <AiFillStar color="rgb(253, 216, 54)" />
                    <AiFillStar color="rgb(253, 216, 54)" />
                    <AiFillStar color="rgb(253, 216, 54)" />
                    <AiFillStar color="rgb(253, 216, 54)" />
                    <AiFillStar color="rgb(253, 216, 54)" />
                  </div>
                  <p>{rates.totalRate} nhận xét</p>
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




                  <div
                    className={`review-rating__detail--process h-1 w-32 bg-gray-200 mr-2 rounded-sm after:w-[${parseInt(
                      ((rates["0"]?.rateCount || 0) / rates.totalRate) * 100
                    )}%]`}
                  ></div>

                  <div
                    className={`review-rating__detail--process h-1 w-32 bg-gray-200 mr-2 rounded-sm ${ratePercent[0].percent}`}
                  ></div>
                  <div
                    className={`review-rating__detail--process h-1 w-32 bg-gray-200 mr-2 rounded-sm ${percentTailwind[0]}`}
                  ></div>




                  <span>{rates["0"]?.rateCount || 0}</span>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center mr-2">
                    <AiFillStar color="rgb(253, 216, 54)" />
                    <AiFillStar color="rgb(253, 216, 54)" />
                    <AiFillStar color="rgb(253, 216, 54)" />
                    <AiFillStar color="rgb(253, 216, 54)" />
                    <AiFillStar />
                  </div>



                  <div
                    className={`review-rating__detail--process h-1 w-32 bg-gray-200 mr-2 rounded-sm after:w-[${parseInt(
                      ((rates["1"]?.rateCount || 0) / rates.totalRate) * 100
                    )}%]`}
                  ></div>

                  <div
                    className={`review-rating__detail--process h-1 w-32 bg-gray-200 mr-2 rounded-sm ${ratePercent[1].percent}`}
                  ></div>
                  <div
                    className={`review-rating__detail--process h-1 w-32 bg-gray-200 mr-2 rounded-sm ${percentTailwind[1]}`}
                  ></div>



                  <span>{rates["1"]?.rateCount || 0}</span>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center mr-2">
                    <AiFillStar color="rgb(253, 216, 54)" />
                    <AiFillStar color="rgb(253, 216, 54)" />
                    <AiFillStar color="rgb(253, 216, 54)" />
                    <AiFillStar />
                    <AiFillStar />
                  </div>



                  <div
                    className={`review-rating__detail--process h-1 w-32 bg-gray-200 mr-2 rounded-sm after:w-[${parseInt(
                      ((rates["2"]?.rateCount || 0) / rates.totalRate) * 100
                    )}%]`}
                  ></div>

                  <div
                    className={`review-rating__detail--process h-1 w-32 bg-gray-200 mr-2 rounded-sm ${ratePercent[2].percent}`}
                  ></div>
                  <div
                    className={`review-rating__detail--process h-1 w-32 bg-gray-200 mr-2 rounded-sm ${percentTailwind[2]}`}
                  ></div>



                  <span>{rates["2"]?.rateCount || 0}</span>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center mr-2">
                    <AiFillStar color="rgb(253, 216, 54)" />
                    <AiFillStar color="rgb(253, 216, 54)" />
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar />
                  </div>



                  <div
                    className={`review-rating__detail--process h-1 w-32 bg-gray-200 mr-2 rounded-sm after:w-[${parseInt(
                      ((rates["3"]?.rateCount || 0) / rates.totalRate) * 100
                    )}%]`}
                  ></div>

                  <div
                    className={`review-rating__detail--process h-1 w-32 bg-gray-200 mr-2 rounded-sm ${ratePercent[3].percent}`}
                  ></div>
                  <div
                    className={`review-rating__detail--process h-1 w-32 bg-gray-200 mr-2 rounded-sm ${percentTailwind[3]}`}
                  ></div>



                  <span>{rates["3"]?.rateCount || 0}</span>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center mr-2">
                    <AiFillStar color="rgb(253, 216, 54)" />
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar />
                  </div>



                  <div
                    className={`review-rating__detail--process h-1 w-32 bg-gray-200 mr-2 rounded-sm after:w-[${parseInt(
                      ((rates["4"]?.rateCount || 0) / rates.totalRate) * 100
                    )}%]`}
                  ></div>

                  <div
                    className={`review-rating__detail--process h-1 w-32 bg-gray-200 mr-2 rounded-sm ${ratePercent[4].percent}`}
                  ></div>
                  <div
                    className={`review-rating__detail--process h-1 w-32 bg-gray-200 mr-2 rounded-sm ${percentTailwind[4]}`}
                  ></div>


                  <span>{rates["4"]?.rateCount || 0}</span>
                </div>
              </div>
            </div>
            <div className="ml-10">Đánh giá</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Review;
