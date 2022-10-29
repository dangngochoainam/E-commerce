import React, { useEffect, useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { payment } from '../../utils/apiCheckOut';

const Stripe = ({ currentUser, amount, handleCheckOut }) => {
  const [stripeToken, setStripeToken] = useState(null);
  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await payment(currentUser, {
          tokenId: stripeToken.id,
          amount: amount,
        });
        console.log(res);
        handleCheckOut();
      } catch (error) {
        console.log(error);
      }
    };
    stripeToken && makeRequest();
  }, [stripeToken]);
  return (
    <div>
      {/* {stripeToken ? (
        <span>Đang xử lý. Vui lòng đợi giây lát...</span>
      ) : (
        <>
          <StripeCheckout
            name="NamDNH"
            image="https://res.cloudinary.com/de5pwc5fq/image/upload/v1666019608/825b219385d46_k9zpfl.png"
            billingAddress
            shippingAddress
            description={`Số tiền cần thanh toán là $${amount}`}
            amount={amount}
            token={onToken}
            stripeKey={process.env.REACT_APP_STRIPE_KEY}
          >
            <button
              className="bg-blue-500 font-semibold hover:bg-blue-600 py-3 text-sm text-white uppercase w-full"
              //   onClick={() => handleCheckOut()}
            >
              Thanh toán qua VISA
            </button>
          </StripeCheckout>
        </>
      )} */}

      <>
        <StripeCheckout
          name="NamDNH"
          image="https://res.cloudinary.com/de5pwc5fq/image/upload/v1666019608/825b219385d46_k9zpfl.png"
          billingAddress
          shippingAddress
          description={`Số tiền cần thanh toán là $${amount}`}
          amount={amount * 100}
          token={onToken}
          stripeKey={process.env.REACT_APP_STRIPE_KEY}
        >
          <button
            className="bg-green-500 font-semibold hover:bg-green-600 py-3 text-sm text-white uppercase w-full"
          >
            Thanh toán qua VISA
          </button>
        </StripeCheckout>
      </>
    </div>
  );
};

export default Stripe;
