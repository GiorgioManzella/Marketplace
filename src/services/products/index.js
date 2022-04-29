import express from "express";
import productSchema from "./productSchema.js";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { cloudinaryStorage } from "multer-storage-cloudinary";

const productRouter = express.Router();

const cloudinaryUpload = multer({
  storage: new cloudinaryStorage({ cloudinary }),
});

//-GET ---------------------------------------------------------------------------

productRouter.get("/", async function (req, res, next) {
  try {
    const products = await productSchema.find();
    res.status(200).send(products);
  } catch (error) {
    next(error);
  }
});
// GET BY ID ---------------------------------------------------------------------------
productRouter.get("/Id", async function (req, res, next) {
  try {
    const product = await productSchema.findById(req.params.Id);
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

productRouter.post("/id/upload", async function (req, res, next) {
  try {
  } catch (error) {}
});

// PUT ---------------------------------------------------------------------------
productRouter.put("/", async function (req, res, next) {
  try {
    const productUpdate = await productSchema.findByIdAndUpdate(
      req.params.id,
      req.body
    );

    res.status(202).send(productUpdate);
  } catch (error) {
    next(error);
  }
});
//DELETE -------------------------------------------------------------------------
productRouter.delete("/id", async function (req, res, next) {
  try {
    const deleteProduct = await productSchema.findByIdAndDelete(req.params.id);
    res.status(204).send(`product ${req.params.id} deleted`);
  } catch (error) {
    next(error);
  }
});

export default productRouter;
