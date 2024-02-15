type CustomBaseImageProps = {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
};

const CustomBaseImage = ({
  src,
  alt,
  width,
  height,
  minWidth,
  minHeight,
  maxWidth,
  maxHeight,
}: CustomBaseImageProps) => {
  return (
    <div
      className="flex relative items-center"
      style={{
        height,
        minWidth,
        minHeight,
        maxWidth,
        maxHeight,
        flexShrink: 0,
      }}
    >
      <img
        style={{ width, height }}
        className="object-cover"
        src={src}
        alt={alt}
      />
    </div>
  );
};

export default CustomBaseImage;
