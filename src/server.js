import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import productRouter from "./services/products/index.js";
import listEndpoints from "express-list-endpoints";
import reviewRouter from "./services/reviews/index.js";

const server = express();
const port = process.env.PORT || 3000;

// middlewares ----------------------------------------------------------------

server.use(cors());
server.use(express.json());

//endpoints ----------------------------------------------------------------

server.use("/product", productRouter);
server.use("/reviews", reviewRouter);

//connection to db-----------------------------------------------------------

mongoose.connect(process.env.MONGO_CONNECTION);
mongoose.connection.on("connected", () => {
  console.log("successfully connected"),
    server.listen(port, () => {
      console.table(listEndpoints(server));
      console.log(`server is running on port: ${port}`);
    });
});
