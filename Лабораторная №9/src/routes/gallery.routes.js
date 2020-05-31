const { Router } = require("express");
const router = Router();
const fs = require("fs");
const http = require("http");
const https = require("https");
const path = require("path");
const multer = require("multer");
const upload = multer({ dest: "static/" });

router.get("/loadImages", async (req, resp) => {
  const images = fs.readdirSync(path.join(__rootdir, "static"));
  resp.json({ images });
});

router.post("/uploadImage", upload.single("image"), async (req, resp) => {
  const image = req.file;
  const newImagePath = path.join(__rootdir, "/static", image.originalname);

  fs.rename(image.path, newImagePath, function (err) {
    if (err) {
      console.log(err);
      resp.send(500);
    } else {
      resp.json({
        message: "File uploaded successfully",
        filename: newImagePath.split("/").slice(-1)[0],
      });
    }
  });
});

router.post("/uploadImageUrl", async (req, resp) => {
  const imageUrl = req.body.uploadImgUrl;
  const file = fs.createWriteStream(
    path.join(__rootdir, "static", imageUrl.split("/").slice(-1)[0])
  );
  try {
    http.get(imageUrl, (response) => {
      response.pipe(file);
    });
  } catch (e) {
    if (e.message.indexOf("Protocol") > -1) {
      https.get(imageUrl, (response) => {
        response.pipe(file);
      });
    }
  }
  resp.json({
    message: "File uploaded successfully",
  });
});

router.post("/removeImage", async (req, resp) => {
  const imageSrc = req.body.imageSrc;
  fs.unlink(path.join("static", imageSrc), () => {
    resp.json({
      message: "File was removed successfully",
    });
  });
});

module.exports = router;
