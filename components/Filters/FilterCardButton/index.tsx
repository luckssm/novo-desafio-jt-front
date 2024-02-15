import React from "react";

type FilterCardButtonProps = {
  isSelected?: boolean;
  setSelected?: () => void;
  children: React.ReactNode;
  selectedStyle?: React.CSSProperties;
};

export const FilterCardButton = ({
  isSelected,
  setSelected,
  children,
  selectedStyle,
}: FilterCardButtonProps) => {
  return (
    <button
      className="px-2 py-1 border border-graygray-10 rounded-sm w-full"
      style={isSelected && selectedStyle}
      onClick={setSelected}
    >
      {children}
    </button>
  );
};
