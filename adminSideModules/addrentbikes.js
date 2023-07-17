const express = require("express");
const router = express.Router();
const adminAuthentication = require("../middelware/adminAuthentication");

const Rentbike = require("../models/rentbikeSchema");

const multer = require("multer");

const upload = multer({ dest: "uploads/" });
const cloudinary = require("cloudinary");
// const ri = require('./src/routers')
cloudinary.config({
  cloud_name: "du2yndveo",
  api_key: "336945855647363",
  api_secret: "pTndbkaHkUvGe3Dpp6LkRSW66mM",
});
module.exports = router.post(
  "/addrentbikes",
  upload.single("myrentfile"),
  async (req, res, next) => {
    try {
      let imageUrl;
      if (req?.file) {
        const url = await cloudinary.uploader.upload(req?.file?.path);
        imageUrl = url?.secure_url;
      }
      const data = new Rentbike({
        brand: req.body.brand,
        model: req.body.model,
        year: req.body.year,
        color: req.body.color,
        seats: req.body.seats,
        price: req.body.price,
        rent: req.body.rent,
        fileName: req.file.filename,
        filePath: imageUrl,
        fileType: req.file.mimetype,
        fileSize: req.file.size,
      });
      await data.save();
      res.status(201).send("Data uploaded successfully");
    } catch (error) {
      throw error
      res.status(400).send(error.message);
    }
  }
);
