import express from "express";
import productSchema from "./productSchema.js";

const productRouter = express.Router();

productRouter.get("/", async function (req, res, next) {
  try {
    const products = await productSchema.find();
    res.status(200).send(products);
  } catch (error) {}
});

productRouter.get("/productId", async function (req, res, next) {
  try {
  } catch (error) {}
});

productRouter.post("/", async function (req, res, next) {
  try {
  } catch (error) {}
});

productRouter.put("/", async function (req, res, next) {
  try {
  } catch (error) {}
});

productRouter.delete("/", async function (req, res, next) {
  try {
  } catch (error) {}
});

export default productRouter;
