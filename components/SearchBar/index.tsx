import React, { useState } from "react";
import CustomBaseImage from "../CustomBaseImage/CustomBaseImage";

type SearchBarProps = {
  searchFunction: (input: string) => void;
};

const SearchBar = ({ searchFunction }: SearchBarProps) => {
  const [inputText, setInputText] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const searchHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    searchFunction(inputText);
  };

  return (
    <form
      onSubmit={searchHandler}
      className="border border-graygray-20 flex items-center h-[48px]"
    >
      <div className="p-2 flex w-full items-center mx-2">
        <CustomBaseImage
          src="/static/icons/pin-location.svg"
          alt="Localização"
          width={24}
          height={24}
        />
        <input
          type="text"
          className="flex-grow py-2 border-none outline-none ml-2"
          placeholder="Busque por atração"
          onChange={handleInputChange}
        />
      </div>
      <button
        className="border-l border-graygray-20 h-full mr-3 pl-3"
        type="submit"
      >
        <CustomBaseImage
          src="/static/icons/search-icon.svg"
          alt="Busca"
          width={24}
          height={24}
        />
      </button>
    </form>
  );
};

export default SearchBar;
