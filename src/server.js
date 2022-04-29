import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import productRouter from "./services/products/index.js";
import listEndpoints from "express-list-endpoints";
import {
  genericErrorHandler,
  notFoundErrorHandler,
  badRequestErrorHandler,
  unauthorizedErrorHandler,
} from "./errorHandler.js";
import reviewRouter from "./services/reviews/index.js";

const server = express();
const port = process.env.PORT || 3003;

// middlewares ----------------------------------------------------------------

server.use(cors());
server.use(express.json());

//endpoints ----------------------------------------------------------------

server.use("/product", productRouter);
server.use("/reviews", reviewRouter);

// error handlers ----------------------------------------------------------------
server.use(badRequestErrorHandler);
server.use(unauthorizedErrorHandler);
server.use(notFoundErrorHandler);
server.use(genericErrorHandler);

//connection to db-----------------------------------------------------------

mongoose.connect(
  "mongodb+srv://test:test@cluster0.teeo4.mongodb.net/Marketplace?retryWrites=true&w=majority"
);
mongoose.connection.on("connected", () => {
  console.log("successfully connected"),

    server.listen(port, () => {

   
      console.table(listEndpoints(server));
      console.log(`server is running on port: ${port}`);
    });
});
