import React from "react";

import CustomBaseImage from "../CustomBaseImage/CustomBaseImage";
import CardImageOptions from "../CardImageOptions";
import ReviewRating from "../ReviewRating";
import PrimaryButton from "../Buttons/PrimaryButton/PrimaryButton";
import LocationInfoText from "../LocationInfoText";
import { reaisToTextWithoutDollarSign } from "../../services/utils/helpers/money";

type TicketCardProps = {
  attractionTitle: string;
  attractionLocation: string;
  attractionImage: string;
  attractionImageAlt: string;
  attractionPriceBefore: number;
  attractionPriceNow: number;
  attractionRatingCount: number;
  attractionRatingValue: number;
  onButtonClick: () => void;
};

const TicketCard = ({
  attractionTitle,
  attractionLocation,
  attractionPriceBefore,
  attractionPriceNow,
  attractionImage,
  attractionImageAlt,
  attractionRatingCount,
  attractionRatingValue,
  onButtonClick,
}: TicketCardProps) => {
  const resolvePrice = (price: number) => {
    const priceValue = price ? price : 0;
    return reaisToTextWithoutDollarSign(priceValue);
  };

  return (
    <div className=" bg-graygray-00 shadow-shadow-s w-full flex">
      <div className="relative">
        <CustomBaseImage
          src={attractionImage}
          alt={attractionImageAlt}
          minWidth={100}
          maxWidth={213}
          height={"100%"}
        />
        <CardImageOptions />
      </div>
      <div className="w-full flex-wrap sm:flex">
        <div className="w-full sm:w-2/3 pt-3 sm:pt-8 px-6">
          <h3 className="mb-2" data-test={"ticket-name"}>
            {attractionTitle}
          </h3>
          <LocationInfoText locationText={attractionLocation} />
          <div className="mt-4 sm:mt-11">
            <ReviewRating
              reviewNote={attractionRatingValue}
              reviewAmount={attractionRatingCount}
            />
          </div>
        </div>
        <div className="w-full sm:w-1/3 py-3 sm:py-6 pr-6">
          <div className="border-l border-graygray-20 h-full py-6 pl-6">
            <div>
              <p className="p3 text-graygray-50">
                de R$ {resolvePrice(attractionPriceBefore)} por
              </p>
              <div className="flex">
                <p className="p3 text-brand-color-black mr-1">R$</p>
                <h2 className="">{resolvePrice(attractionPriceNow)}</h2>
              </div>
            </div>
            <div className="mt-6">
              <PrimaryButton
                buttonText={"Saber mais"}
                iconType={"right-arrow"}
                onButtonClick={onButtonClick}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
