import React, { useEffect, useState } from "react";
const classes = require("./Slider.module.scss");

export const Slider = ({ images, initImg, setInit }) => {
  const [currentIdx, setCurrentIdx] = useState(null);

  useEffect(() => {
    setCurrentIdx(images.indexOf(initImg));
  }, [images, initImg]);

  const getPrevImage = () => {
    return currentIdx - 1 > -1
      ? images[currentIdx - 1]
      : images[images.length - 1];
  };

  const getNextImage = () => {
    return currentIdx + 1 < images.length ? images[currentIdx + 1] : images[0];
  };

  if (!initImg) {
    return <></>;
  }

  return (
    <div className={classes.Slider__wrapper} onClick={() => setInit(null)}>
      <div
        className={classes.Slider__body}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={classes.Slider__arrow_prev}
          onClick={() => setInit(getPrevImage())}
        />
        <img src={getPrevImage()} alt="" className={classes.Slider__prev_img} />
        <img src={images[currentIdx]} alt="" className={classes.Slider__img} />
        <img src={getNextImage()} alt="" className={classes.Slider__next_img} />
        <div
          className={classes.Slider__arrow_next}
          onClick={() => setInit(getNextImage())}
        />
      </div>
    </div>
  );
};
