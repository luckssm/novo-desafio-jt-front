import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";

import { useRouter } from "next/router";

import { selectCurrentCart } from "../../redux/slices/cartSlice";

import CustomBaseImage from "../CustomBaseImage/CustomBaseImage";
import CartPopover from "../Cart/CartPopover";

function assertIsNode(e: EventTarget | null): asserts e is Node {
  if (!e || !("nodeType" in e)) {
    throw new Error(`Node expected`);
  }
}

export const Header = () => {
  const router = useRouter();

  const cart = useSelector(selectCurrentCart);
  const cartItems = cart?.cartItems;
  const isCartItemsEmpty = cartItems?.length === 0;

  const buttonRef = useRef(null);
  const [isPopoverVisible, setPopoverVisible] = useState(false);

  useEffect(() => {
    const handleOutsideClick = ({ target }: MouseEvent): void => {
      if (isPopoverVisible) {
        const popover = document.querySelector(".popover");
        assertIsNode(target);
        if (
          popover &&
          !popover.contains(target) &&
          buttonRef.current &&
          !buttonRef.current.contains(target)
        ) {
          // Clicked outside of the popover and not the button or its elements, close it
          setPopoverVisible(false);
        }
      }
    };

    if (isPopoverVisible) {
      document.body.addEventListener("click", handleOutsideClick);
    } else {
      // Remove the event listener when the popover is closed
      document.body.removeEventListener("click", handleOutsideClick);
    }

    return () => {
      // Cleanup: Remove the event listener when the component unmounts
      document.body.removeEventListener("click", handleOutsideClick);
    };
  }, [isPopoverVisible]);

  const togglePopover = () => {
    if (cartItems && !isCartItemsEmpty) {
      setPopoverVisible(!isPopoverVisible);
    }
  };

  const goToHomePage = () => {
    router.push("/");
  };

  const getCartItemsCount = () => {
    const cartItemsCount = cartItems?.length;
    if (!cartItemsCount) {
      return 0;
    }
    return cartItemsCount;
  };

  return (
    <>
      <div className="px-[16px] lg:px-[60px] py-3 md:py-6 border-b-2">
        <div className="flex flex-row flex-wrap justify-center sm:justify-between items-center ">
          <button onClick={goToHomePage}>
            <CustomBaseImage
              src={"/static/logos/light-background-logo.svg"}
              alt={"logoipsum logo"}
              width={"100%"}
              height={30}
            />
          </button>
          <div className="flex flex-row my-2 flex-wrap min-[375px]:flex-end items-center h-full space-x-5 justify-center">
            <div>
              <p className="p4">Cotação dólar hoje: R$5,53</p>
            </div>
            <CustomBaseImage
              src={"/static/images/br-flag.png"}
              alt={"Bandeira do Brasil"}
              width={30}
              height={21}
            />
            <CustomBaseImage
              src={"/static/icons/message-question-checkmark.svg"}
              alt={"Botão de Suporte"}
              width={24}
              height={24}
            />
            <div className="border-r-2 border-graygray-10 h-1/2"></div>
            <div className="flex justify-center">
              <CustomBaseImage
                src={"/static/icons/profile.svg"}
                alt={"Ícone de Perfil"}
                width={24}
                height={24}
              />
              <p className="text-brand-color-blue ml-1 p22 text-center">
                Entrar
              </p>
            </div>
            <div className="h-[50px] mt-2 sm:mt-0">
              <button
                className="flex flex-row justify-center items-center h-full bg-white-label-primary rounded w-[100px] space-x-1"
                onClick={togglePopover}
                ref={buttonRef}
                data-test={"cart-button"}
              >
                <CustomBaseImage
                  src={"/static/icons/shop-cart-white.svg"}
                  alt={"Ícone de Carrinho"}
                  width={36}
                  height={36}
                />
                <div className="flex justify-center items-center bg-transparent-00 rounded-full w-8 h-8">
                  <p className="text-white" data-test={"cart-counter"}>
                    {getCartItemsCount()}
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      {isPopoverVisible && (
        <CartPopover
          buttonRef={buttonRef}
          cartItems={cartItems}
          closePopover={() => setPopoverVisible(false)}
        />
      )}
    </>
  );
};

export default Header;
