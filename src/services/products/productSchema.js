import mongoose from "mongoose";

const { Schema, model } = mongoose;

const productSchema = new Schema({
  name: { type: "string", required: true },
  description: { type: "string", required: true },
  brand: { type: "string", required: true },
  imageUrl: { type: "string", required: true },
  price: { type: "string", required: true },
  category: { type: "string" },
  reviews: [{ type: Schema.Types.ObjectId, ref: "reviews" }],
});

export default model("product", productSchema);

// {
//     "_id": "5d318e1a8541744830bef139", //SERVER GENERATED
//      "name": "app test 1",  //REQUIRED
//      "description": "somthing longer", //REQUIRED
//      "brand": "nokia", //REQUIRED
//      "imageUrl": "https://drop.ndtv.com/TECH/product_database/images/2152017124957PM_635_nokia_3310.jpeg?downsize=*:420&output-quality=80", //REQUIRED
//      "price": 100, //REQUIRED
//      "category": "smartphones",
//         "reviews": [.....]
//      "createdAt": "2019-07-19T09:32:10.535Z", //SERVER GENERATED
//      "updatedAt": "2019-07-19T09:32:10.535Z", //SERVER GENERATED
//      }
