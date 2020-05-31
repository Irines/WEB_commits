import React, { useContext } from "react";
import { SliderContext } from "../../context/SliderContext";
const classes = require("./PictureCard.module.scss");

export const PictureCard = ({ imageSrc, onRemove }) => {
  const { onSliderInit } = useContext(SliderContext);

  return (
    <div className={classes.PictureCard__wrapper}>
      <img
        src={imageSrc}
        alt=""
        className={classes.PictureCard__pic}
        onClick={() => onSliderInit(imageSrc)}
      />
      <button
        className={classes.PictureCard__remove}
        onClick={() => onRemove(imageSrc)}
      />
    </div>
  );
};
