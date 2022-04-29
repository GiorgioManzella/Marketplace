import express from "express";
import productSchema from "./productSchema.js";

const productRouter = express.Router();

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
productRouter.get("/productId", async function (req, res, next) {
  try {
    const product = await productSchema.findById(req.params.productId);
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
// PUT ---------------------------------------------------------------------------
productRouter.put("/", async function (req, res, next) {
  try {
  } catch (error) {
    next(error);
  }
});
//DELETE -------------------------------------------------------------------------
productRouter.delete("/", async function (req, res, next) {
  try {
  } catch (error) {
    next(error);
  }
});

export default productRouter;
