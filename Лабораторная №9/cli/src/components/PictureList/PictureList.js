import React, { useState } from "react";
import DragDropInput from "../UI/DragDropInput/DragDropInput";
const classes = require("./PictureList.module.scss");
const { PictureCard } = require("../PictureCard/PictureCard");

export const PictureList = ({ images, onAdd, onRemove }) => {
  const [uploadImg, setUploadImg] = useState(null);

  const changeHandler = (event) => {
    setUploadImg(event.target.files[0]);
  };

  return (
    <>
      <div className={classes.PictureList__wrapper}>
        {images &&
          images.map((img, idx) => {
            return <PictureCard key={idx} imageSrc={img} onRemove={onRemove} />;
          })}
      </div>
      <div className={classes.user_upload}>
        <DragDropInput
          changeHandler={changeHandler}
          handleDrop={(file) => {
            onAdd(file);
          }}
        />
        <button
          className={classes.PictureList__button_add}
          onClick={() => onAdd(uploadImg)}
        >
          Добавить
        </button>
      </div>
    </>
  );
};
