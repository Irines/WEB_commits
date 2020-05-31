const express = require("express");
const path = require("path");

const app = express();
app.use(express.json({ extended: true }));
app.use("/api/gallery", require("./src/routes/gallery.routes.js"));
app.use(express.static("static"));
global.__rootdir = __dirname;

try {
  app.listen(5000, () => {
    console.log("App has been launched on port 5000");
  });
} catch (e) {
  console.log("Server Error", e.message);
  process.exit(1);
}
