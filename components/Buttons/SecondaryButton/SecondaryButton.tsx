type SecondaryButtonProps = {
  buttonText: string;
  onButtonClick?: () => void;
};

const SecondaryButton = ({
  buttonText,
  onButtonClick,
}: SecondaryButtonProps) => {
  return (
    <button
      className="flex bg-graygray-00 py-3 px-4 justify-center items-center w-full h-full rounded-sm"
      onClick={onButtonClick}
    >
      <p className="p3 text-supportsupport-01">{buttonText}</p>
    </button>
  );
};

export default SecondaryButton;
