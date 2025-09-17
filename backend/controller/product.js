const express = require("express");
const Product = require("../model/product");
const Order = require("../model/order");
const router = express.Router();
const catchAsyncError = require("../middleware/catchAsyncError");
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const Shop = require("../model/shop");
const { isSeller, isAuthenticated, isAdmin } = require("../middleware/auth");
const fs = require("fs");
const path = require("path");
const cloudinary = require('cloudinary')

// CREATE A NEW  PRODUCT
router.post(
  "/create-product",
  upload.array("images"),
  catchAsyncError(async (req, resp, next) => {
    try {
      const {
        shopId,
        name,
        description,
        category,
        tags,
        originalPrice,
        discountPrice,
        stock,
      } = req.body;

      const shop = await Shop.findById(shopId);
      if (!shop) {
        return next(new ErrorHandler("Shop id is invalid", 400));
      }

      // Upload images to Cloudinary
      let imagesLinks = [];
      if (req.files) {
        for (let file of req.files) {
          const myCloud = await cloudinary.v2.uploader.upload(file.path, {
            folder: "products",
          });
          imagesLinks.push({
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          });
        }
      }

      // Create product
      const product = await Product.create({
        name,
        description,
        category,
        tags,
        originalPrice,
        discountPrice,
        stock,
        shop,
        images: imagesLinks,
      });

      resp.status(201).json({
        success: true,
        product,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// GET ALL PRODUCTS FOR ALL PRODUCTS
router.get(
  "/get-all-products-shop/:id",
  catchAsyncError(async (req, resp, next) => {
    try {
      const products = await Product.find({ shopId: req.params.id });
      resp.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// GET ALL PRODUCTS
router.get("/get-all-products", async (req, resp, next) => {
  try {
    const product = await Product.find().sort({ createdAt: -1 });
    resp.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

// DELETE PRODUCT OF A SHOP
router.delete(
  "/delete-shop-product/:id",
  isSeller,
  catchAsyncError(async (req, resp, next) => {
    const productId = req.params.id;

    // Find the product
    const product = await Product.findById(productId);
    if (!product) {
      return next(new ErrorHandler("Product not found with this ID", 404));
    }

    // Delete associated images
    if (product.images && product.images.length > 0) {
      for (let img of product.images) {
        // If images stored as filenames
        const filePath = path.join(
          __dirname,
          "..",
          "uploads",
          img.filename || img
        );
        try {
          await fs.promises.unlink(filePath);
          console.log(`✅ Deleted file: ${filePath}`);
        } catch (err) {
          console.warn(`⚠️ Failed to delete file (${filePath}):`, err.message);
        }
      }
    }

    // Delete the product from DB
    await product.deleteOne();

    resp.status(200).json({
      success: true,
      message: "Product deleted successfully along with images!",
    });
  })
);

// REVIEW FOR A PRODUCT

router.put(
  "/create-new-review",
  isAuthenticated,
  catchAsyncError(async (req, res, next) => {
    try {
      const { rating, comment, productId, orderId } = req.body;

      // 🔹 Step 1: Ensure product exists
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      // 🔹 Step 2: Ensure reviews array exists
      if (!Array.isArray(product.reviews)) {
        product.reviews = [];
      }

      // 🔹 Step 3: Check if user already reviewed
      const existingReview = product.reviews.find(
        (rev) => rev.user.toString() === req.user._id.toString()
      );

      if (existingReview) {
        existingReview.rating = rating;
        existingReview.comment = comment;
      } else {
        product.reviews.push({
          user: {
            _id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            avatar: req.user.avatar?.url,
          },
          rating,
          comment,
        });
      }

      // 🔹 Step 4: Recalculate ratings
      const total = product.reviews.reduce((acc, r) => acc + r.rating, 0);
      product.ratings = total / product.reviews.length;

      // 🔹 Step 5: Save product
      await product.save({ validateBeforeSave: false });

      // 🔹 Step 6: Mark product as reviewed in the order
      await Order.findOneAndUpdate(
        { _id: orderId },
        { $set: { "cart.$[elem].isReviewed": true } },
        { arrayFilters: [{ "elem._id": productId }], new: true }
      );

      return res.status(200).json({
        success: true,
        message: "Reviewed successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// DELETE PRODUCTS FOR --ADMIN
router.delete(
  "/delete-product/:id",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncError(async (req, resp, next) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) {
        return next(new ErrorHandler(" Product not found with this id"));
      }

      resp.status(201).json({
        success: true,
        message: "Productr deleted sucessfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

module.exports = router;
