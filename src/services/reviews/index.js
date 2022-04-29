import express from "express";
import createError from "http-errors";
import reviewModel from "./model.js";

const reviewRouter = express.Router();

reviewRouter.post("/", async (req, res, next) => {
  try {
    const postReview = new reviewModel(req.body);
    const { _id } = await postReview.save();
    res.status(201).send({ _id });
  } catch (error) {
    next(error);
  }
});

reviewRouter.get("/", async (req, res, next) => {
  try {
    const getReviews = await reviewModel.find();
    res.send(getReviews);
  } catch (error) {
    next(error);
  }
});

reviewRouter.get("/:reviewId", async (req, res, next) => {
  try {
    const oneReview = await reviewModel.findById(req.params.reviewId);
    res.send(oneReview);
  } catch (error) {
    next(error);
  }
});

reviewRouter.put("/:reviewId", async (req, res, next) => {
  try {
    const updateReview = await reviewModel.findByIdAndUpdate(
      req.params.reviewId,
      req.body,
      { new: true }
    );

    if (updateReview) {
      res.send(updateReview);
    } else {
      next(createError(404, `review with id ${req.params.reviewId} not found`));
    }
  } catch (error) {
    next(error);
  }
});

reviewRouter.delete("/:reviewId", async (req, res, next) => {
  try {
    const deleteUpdate = await reviewModel.findByIdAndDelete(
      req.params.reviewId
    );
    if (deleteUpdate) {
      res.send(`review with id ${req.params.reviewId} deleted successfully`);
    } else {
      next(
        createError(404, `review with id ${req.params.reviewId} is not found`)
      );
    }
  } catch (error) {
    next(error);
  }
});

export default reviewRouter;
