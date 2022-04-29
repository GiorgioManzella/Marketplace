import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const server = express();
const port = process.env.PORT || 3000;

// middlewares ----------------------------------------------------------------

server.use(cors());
server.use(express.json());

//connection to db-----------------------------------------------------------

mongoose.connect(process.env.MONGO_CONNECTION);
mongoose.connection.on("connected", () => {
  console.log("successifully connected"),
    server.listen(port, () => {
      console.table(listEndpoints(server));
      console.log(`server is running on port: ${port}`);
    });
});
