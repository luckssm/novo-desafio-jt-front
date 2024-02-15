import React from "react";
import CustomBaseImage from "../../CustomBaseImage/CustomBaseImage";
import LoaderSpinner from "../../LoaderSpinner";

type PrimaryButtonProps = {
  buttonText: string;
  iconType?: string;
  onButtonClick: () => void;
  customButtonStyle?: React.CSSProperties;
  customTextStyle?: React.CSSProperties;
  isLoading?: boolean;
  dataTest?: string;
};

const PrimaryButton = ({
  buttonText,
  iconType,
  onButtonClick,
  customButtonStyle,
  customTextStyle,
  isLoading,
  dataTest,
}: PrimaryButtonProps) => {
  const ButtonIcon = () => {
    return (
      iconType === "right-arrow" && (
        <div className="ml-3">
          <CustomBaseImage
            src={"/static/icons/arrow-right.svg"}
            alt={"seta direita"}
          />
        </div>
      )
    );
  };

  return (
    <button
      className="flex bg-brand-color-blue hover:bg-white-label-primary py-3 px-2 justify-center items-center w-full rounded-sm"
      style={customButtonStyle}
      onClick={() => !isLoading && onButtonClick()}
      data-test={dataTest}
    >
      {isLoading ? (
        <>
          <LoaderSpinner />
        </>
      ) : (
        <>
          <p className="p3 text-white" style={customTextStyle}>
            {buttonText}
          </p>
          <ButtonIcon />
        </>
      )}
    </button>
  );
};

export default PrimaryButton;
