import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import productRouter from "./services/products/index.js";
import listEndpoints from "express-list-endpoints";

const server = express();
const port = process.env.PORT || 3000;

// middlewares ----------------------------------------------------------------

server.use(cors());
server.use(express.json());

//endpoints ----------------------------------------------------------------

server.use("/product", productRouter);

//connection to db-----------------------------------------------------------

// mongoose.connect(
//   "mongodb+srv://test:test@cluster0.teeo4.mongodb.net/Marketplace?retryWrites=true&w=majority"
// );
// mongoose.connection.on("connected", () => {
//   console.log("successifully connected"),
//     server.listen(port, () => {
//       console.table(listEndpoints(server));
//       console.log(`server is running on port: ${port}`);
//     });
// });

const initialize = async () => {
  try {
    server.listen(port, async () => {
      console.log("server is running on port " + port);
    });

    server.on("error", (error) => {
      console.log("server error: " + error);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

initialize();
