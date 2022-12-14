import React, { useEffect, useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { countRateOfProduct } from '../../utils/apiReview';
import ReviewModal from '../Modal/ReviewModal';
import { useSelector } from 'react-redux';
import './style.scss';
import ListReviewModal from '../Modal/ListReviewModal';

const Review = ({ rate, product }) => {
  const [rates, setRates] = useState();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const fetchAPI = async () => {
    const res = await countRateOfProduct(product.id);
    console.log(res);
    const totalRate = res.data.reduce((acc, item) => acc + item.rateCount, 0);
    const avgRate =
      res.data.reduce((acc, item) => acc + item.rateCount * item.rate, 0) /
      totalRate;

    setRates({ ...res.data, totalRate, avgRate });
  };
  useEffect(() => {
    console.log('useEffect Review');
    fetchAPI();
  }, [product]);

  let ratePercent, percentTailwind;
  if (rates) {
    ratePercent = [
      {
        rate: 5,
        percent: `after:w-[${parseInt(
          ((rates['0']?.rateCount || 0) / rates.totalRate) * 100
        )}%]`,
      },
      {
        rate: 4,
        percent: `after:w-[${parseInt(
          ((rates['1']?.rateCount || 0) / rates.totalRate) * 100
        )}%]`,
      },
      {
        rate: 3,
        percent: `after:w-[${parseInt(
          ((rates['2']?.rateCount || 0) / rates.totalRate) * 100
        )}%]`,
      },
      {
        rate: 2,
        percent: `after:w-[${parseInt(
          ((rates['3']?.rateCount || 0) / rates.totalRate) * 100
        )}%]`,
      },
      {
        rate: 1,
        percent: `after:w-[${parseInt(
          ((rates['4']?.rateCount || 0) / rates.totalRate) * 100
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
  console.log(rates);
  return (
    <>
      {rates && (
        <div className="product__review p-2">
          <h3 className="capitalize text-xl mb-3">
            ????nh gi?? - nh???n x??t t??? kh??ch h??ng
          </h3>
          <div className="flex">
            <div>
              <div className="review-rating__summary flex items-center mb-4">
                <div className="text-3xl font-bold mr-3">
              
                  {Number.isNaN(rates.avgRate) ? 0 : rates.avgRate.toFixed(1)}
                </div>
                <div>
                  <div className="flex items-center">
                    <AiFillStar color="rgb(253, 216, 54)" />
                    <AiFillStar color="rgb(253, 216, 54)" />
                    <AiFillStar color="rgb(253, 216, 54)" />
                    <AiFillStar color="rgb(253, 216, 54)" />
                    <AiFillStar color="rgb(253, 216, 54)" />
                  </div>
                  <p>{rates.totalRate} nh???n x??t</p>
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
                      ((rates['0']?.rateCount || 0) / rates.totalRate) * 100
                    )}%]`}
                  ></div>

                  {/* <div
                    className={`review-rating__detail--process h-1 w-32 bg-gray-200 mr-2 rounded-sm ${ratePercent[0].percent}`}
                  ></div>
                  <div
                    className={`review-rating__detail--process h-1 w-32 bg-gray-200 mr-2 rounded-sm ${percentTailwind[0]}`}
                  ></div> */}

                  <span>{rates['0']?.rateCount || 0}</span>
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
                      ((rates['1']?.rateCount || 0) / rates.totalRate) * 100
                    )}%]`}
                  ></div>

                  {/* <div
                    className={`review-rating__detail--process h-1 w-32 bg-gray-200 mr-2 rounded-sm ${ratePercent[1].percent}`}
                  ></div>
                  <div
                    className={`review-rating__detail--process h-1 w-32 bg-gray-200 mr-2 rounded-sm ${percentTailwind[1]}`}
                  ></div> */}

                  <span>{rates['1']?.rateCount || 0}</span>
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
                      ((rates['2']?.rateCount || 0) / rates.totalRate) * 100
                    )}%]`}
                  ></div>

                  {/* <div
                    className={`review-rating__detail--process h-1 w-32 bg-gray-200 mr-2 rounded-sm ${ratePercent[2].percent}`}
                  ></div>
                  <div
                    className={`review-rating__detail--process h-1 w-32 bg-gray-200 mr-2 rounded-sm ${percentTailwind[2]}`}
                  ></div> */}

                  <span>{rates['2']?.rateCount || 0}</span>
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
                      ((rates['3']?.rateCount || 0) / rates.totalRate) * 100
                    )}%]`}
                  ></div>

                  {/* <div
                    className={`review-rating__detail--process h-1 w-32 bg-gray-200 mr-2 rounded-sm ${ratePercent[3].percent}`}
                  ></div>
                  <div
                    className={`review-rating__detail--process h-1 w-32 bg-gray-200 mr-2 rounded-sm ${percentTailwind[3]}`}
                  ></div> */}

                  <span>{rates['3']?.rateCount || 0}</span>
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
                      ((rates['4']?.rateCount || 0) / rates.totalRate) * 100
                    )}%]`}
                  ></div>

                  {/* <div
                    className={`review-rating__detail--process h-1 w-32 bg-gray-200 mr-2 rounded-sm ${ratePercent[4].percent}`}
                  ></div>
                  <div
                    className={`review-rating__detail--process h-1 w-32 bg-gray-200 mr-2 rounded-sm ${percentTailwind[4]}`}
                  ></div> */}

                  <span>{rates['4']?.rateCount || 0}</span>
                </div>
              </div>
            </div>
            <div className="ml-10">
              <ListReviewModal product={product} rates={rates} />
              {currentUser ? (
                <ReviewModal
                  product={product}
                  currentUser={currentUser}
                  fetchAPI={fetchAPI}
                />
              ) : (
                <p className="text-red-400 text-center">
                  Vui l??ng ????ng nh???p ????? ????nh gi??
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Review;
