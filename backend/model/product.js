const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter your product name!"],
  },
  description: {
    type: String,
    required: [true, "Please Enter your product description!"],
  },
  category: {
    type: String,
    required: [true, "Please Enter your product category!"],
  },
  tags: {
    type: String,
  },
  originalPrice: {
    type: Number,
  },
  discountPrice: {
    type: Number,
    required: [true, "Please Enter your product discount price!"],
  },
  stock: {
    type: Number,
    required: [true, "Please Enter your product Stock!"],
  },
  images: [
    {
      public_id:{type:String,required:true},
      url:{type:String,required:true}
    },
  ],
  reviews: {
    type: [
      {
        user: {
          _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
          },
          name: { type: String, required: true },
          email: { type: String, required: true },
          avatar: { type: String },
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
    default: [],
  },

  ratings: {
    type: Number,
  },
  shopId: {
    type: String,
    required: true,
  },
  shop: {
    type: Object,
    requied: true,
  },
  sold_out: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model("Product", ProductSchema);
