import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";

import { centsToText } from "../../../services/utils/helpers/money";
import { checkoutCart } from "../../../redux/slices/cartSlice";

import PrimaryButton from "../../Buttons/PrimaryButton/PrimaryButton";
import CartItemComponent from "../CartItem";

import { CartItem } from "../CartItem";

type CartPopoverProps = {
  buttonRef?: React.MutableRefObject<any>;
  closePopover: () => void;
  cartItems: Array<CartItem>;
};

const CartPopover = ({
  buttonRef,
  closePopover,
  cartItems = [],
}: CartPopoverProps) => {
  // TODO: Add to a config page if more configs are necessary in other pages
  const discountPercentage = 7;
  const installments = 10;

  const dispatch = useDispatch();

  // Gets the cart button's rectangle (DOMRect object) which provides information about
  // the size and position of it relative to the viewport
  const buttonRect = buttonRef?.current?.getBoundingClientRect();

  // Gets the bottom position and calculates the desired new position for the top of our popover
  const popoverTopPosition = buttonRect?.bottom + 8;

  const cartButtonRightPosition = buttonRect?.right;

  const windowSize = useRef([window.innerWidth, window.innerHeight]);
  const windowWidth = windowSize?.current[0];

  // Calculates popover position based on where the cart button is and the screen width,
  // because the button can be in the middle of screen in smaller screen sizes
  const calculatePopoverRightPosition = () => {
    let popoverRightPosition = 0;
    if (windowWidth < 400) {
      popoverRightPosition = 16;
    } else if (windowWidth - cartButtonRightPosition > 100) {
      popoverRightPosition = 36;
    } else {
      popoverRightPosition = windowWidth - cartButtonRightPosition;
    }
    return popoverRightPosition;
  };

  // Sets the popover position in the screen just below the cart button
  const popoverStyle = {
    top: `${popoverTopPosition}px`,
    right: `${calculatePopoverRightPosition()}px`,
  };

  const [cartIntegralPrice, setCartIntegralPrice] = useState(0);

  const renderCartItems = () => {
    return cartItems?.map((cartItem, index) => {
      return (
        <div className="mb-2" key={index}>
          <CartItemComponent item={cartItem} index={index} />
        </div>
      );
    });
  };

  const calculateTotalCartPrice = () => {
    let totalCartPrice = 0;

    cartItems?.forEach((cartItem) => {
      cartItem.tickets?.forEach((ticket) => {
        totalCartPrice += ticket.value;
      });
    });

    return totalCartPrice;
  };

  useEffect(() => {
    if (cartItems?.length === 0) {
      closePopover();
    }
    setCartIntegralPrice(calculateTotalCartPrice());
  }, [cartItems]);

  const resolveTotalCartPrice = () => {
    return centsToText(cartIntegralPrice);
  };

  const calculateTotalDiscount = () => {
    const totalCartPrice = cartIntegralPrice;
    const discountValue = Math.round(
      (totalCartPrice * discountPercentage) / 100,
    );

    return discountValue;
  };

  const resolveTotalValueWithDiscount = () => {
    const discountValue = calculateTotalDiscount();
    const totalCartPrice = cartIntegralPrice;
    const totalValueWithDiscount = totalCartPrice - discountValue;
    return centsToText(totalValueWithDiscount);
  };

  const resolveTotalDiscountValue = () => {
    return centsToText(calculateTotalDiscount());
  };

  const resolveInstallmentPrice = () => {
    const totalCartPrice = cartIntegralPrice;

    return centsToText(Math.round(totalCartPrice / installments));
  };

  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);

  const handleCheckOut = async () => {
    closePopover();
    dispatch(checkoutCart());
  };

  return (
    <div
      className="popover bg-graygray-00 shadow-shadow-l rounded-sm absolute z-50 min-w-[300px] max-w-[500px] p-6"
      style={popoverStyle}
    >
      <div className="mb-3">
        <p className="p2 text-brand-color-black">Ingressos</p>
      </div>
      <div className="border-b overflow-y-auto h-64 mb-8 py-3 pr-4">
        {renderCartItems()}
      </div>
      <div className="border-b border-graygray-10 pb-6 mb-6">
        <div className="flex justify-between mb-3">
          <p className="p2 text-graygray-60">Ingressos</p>
          <p className="p2 text-graygray-60">{resolveTotalCartPrice()}</p>
        </div>
        <div className="flex justify-between mb-3">
          <p className="p2 text-brand-color-black">Subtotal</p>
          <p className="p22 text-light-black">{resolveTotalCartPrice()}</p>
        </div>
        <div className="flex justify-between mb-3">
          <p className="p2 text-graygray-50 mr-12">
            1x de {resolveTotalValueWithDiscount()} com desconto de{" "}
            <span className="text-light-green">(7%)</span>
          </p>
          <p className="p2 text-light-green">-{resolveTotalDiscountValue()}</p>
        </div>
        <div className="flex justify-between">
          <p className="p2 text-graygray-50">
            10x sem juros de {resolveInstallmentPrice()}
          </p>
          <p className="p2 text-graygray-40">{resolveTotalCartPrice()}</p>
        </div>
      </div>
      <div className="flex justify-between items-center mb-6">
        <p className="p2 text-brand-color-black">Valor total</p>
        <h2>{resolveTotalCartPrice()}</h2>
      </div>
      <div>
        <PrimaryButton
          buttonText={"Ir para o check out"}
          customButtonStyle={{
            backgroundColor: "var(--white-label-primary)",
            paddingTop: 18,
            paddingBottom: 18,
          }}
          customTextStyle={{
            fontSize: 16,
          }}
          isLoading={isCheckoutLoading}
          onButtonClick={handleCheckOut}
        />
      </div>
    </div>
  );
};

export default CartPopover;
