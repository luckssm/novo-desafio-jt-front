import CustomBaseImage from "../CustomBaseImage/CustomBaseImage";

const LoaderSpinner = () => {
  return (
    <div className="animate-spin">
      <CustomBaseImage
        src={"/static/icons/spinner-white.svg"}
        alt={"carregando..."}
        width={18}
        height={18}
      />
    </div>
  );
};

export default LoaderSpinner;
