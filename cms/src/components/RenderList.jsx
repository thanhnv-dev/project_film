import React from "react";
import "./details.scss";

const handleEidtBasic = (event, setEdit) => {
  setEdit(event.target.value);
};

const handleNumber = (event, setEdit) => {
  const inputValue = event.target.value;
  let numericValue = inputValue.replace(/\D/g, "");
  numericValue = numericValue === "" ? 0 : parseInt(numericValue);
  setEdit(numericValue);
};

const RenderList = ({
  eidtMode,
  link,
  title,
  value,
  setValue,
  sizeInput,
  number,
}) => {
  const lable = link ? (
    <a href={title} target="_blank" rel="noopener noreferrer">
      <p>{title}</p>
    </a>
  ) : (
    <p>{title}</p>
  );

  return eidtMode ? (
    lable
  ) : (
    <input
      type="text"
      value={value}
      onChange={(event) => {
        number
          ? handleNumber(event, setValue)
          : handleEidtBasic(event, setValue);
      }}
      size={sizeInput}
    />
  );
};

export default RenderList;
