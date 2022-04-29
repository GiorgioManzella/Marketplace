import express from "express";
import productSchema from "./productSchema.js";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import q2m from "query-to-mongo";

const productRouter = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

////////////////////////////////----------
const cloudinaryUpload = multer({
  storage: new CloudinaryStorage({
    cloudinary,
    params: { folder: "test-folder" },
  }),
}).single("image");

//-GET ---------------------------------------------------------------------------

productRouter.get("/", async function (req, res, next) {
  try {
    const products = await productSchema
      .find(mongoQuery.criteria, mongoQuery.options.fields)
      .sort(mongoQuery.options.sort)
      .limit(mongoQuery.options.limit || 10)
      .skip(mongoQuery.options.skip || 0)
      .populate({ path: "reviews" });

    res.status(200).send(products);
  } catch (error) {
    next(error);
  }
});

productRouter.get("/:productId/", async function (req, res, next) {
  try {
    const mongoQuery = q2m(req.query);

    const products = await productSchema
      .find(mongoQuery.criteria, mongoQuery.options.fields)
      .sort(mongoQuery.options.sort)
      .limit(mongoQuery.options.limit || 10)
      .skip(mongoQuery.options.skip || 0)
      .populate({ path: "reviews", select: "comment" });

    res.status(200).send(products);
  } catch (error) {
    next(error);
  }
});

// GET BY ID ---------------------------------------------------------------------------
productRouter.get("/:Id", async function (req, res, next) {
  try {
    const product = await productSchema.findById(req.params.id);
    res.status(200).send(product);
  } catch (error) {
    next(createError(404, "Product not found"));
  }
});
// POST ---------------------------------------------------------------------------
productRouter.post("/", async function (req, res, next) {
  try {
    const newProduct = new productSchema(req.body);
    const { _id } = await newProduct.save();
    res.status(201).send(newProduct);
  } catch (error) {
    next(error);
  }
});

// POST IMAGE ---------------------------------------------------------------------------

productRouter.post(
  "/:id/upload",
  cloudinaryUpload,
  async function (req, res, next) {
    try {
      console.log("req file");
      res.send("image posted");
    } catch (error) {
      next(error);
    }
  }
);

// PUT ---------------------------------------------------------------------------

productRouter.put(
  "/:productId",
  cloudinaryUpload,
  async function (req, res, next) {
    try {
      const productUpdate = await productSchema.findByIdAndUpdate(
        req.params.productId,
        req.body,
        { new: true }
      );
      res.status(202).send(productUpdate);
    } catch (error) {
      next(error);
    }
  }
);
//DELETE -------------------------------------------------------------------------
productRouter.delete("/:productId", async function (req, res, next) {
  try {
    await productSchema.findByIdAndDelete(req.params.productId);
    res.status(204).send(`product ${req.params.productId} deleted`);
  } catch (error) {
    next(error);
  }
});

export default productRouter;
