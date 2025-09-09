const express = require("express");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");
const Order = require("../model/order");
const Product = require("../model/product");
const { isAuthenticated, isSeller, isAdmin } = require("../middleware/auth");
const catchAsyncError = require("../middleware/catchAsyncError");
const Shop = require("../model/shop");

// CREATE ORDER
router.post(
  "/create-order",
  catchAsyncError(async (req, resp, next) => {
    try {
      const { cart, shippingAddress, user, totalPrice, paymentInfo } = req.body;

      const shopItemsMap = new Map();
      for (const item of cart) {
        const shopId = item.shopId;
        if (!shopItemsMap.has(shopId)) {
          shopItemsMap.set(shopId, []);
        }
        shopItemsMap.get(shopId).push(item);
      }

      const orders = [];

      for (const [shopId, items] of shopItemsMap) {
        const order = await Order.create({
          cart: items,
          shippingAddress,
          user,
          totalPrice,
          paymentInfo,
        });
        orders.push(order);
      }
      resp.status(201).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// GET ALL ORDERS FOR USER
router.get(
  "/get-all-orders/:userId",
  catchAsyncError(async (req, resp, next) => {
    try {
      const orders = await Order.find({ "user._id": req.params.userId }).sort({
        createdAt: -1,
      });

      resp.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// GET ALL ORDERS FOR SELLER
router.get(
  "/get-seller-all-orders/:shopId",
  catchAsyncError(async (req, resp, next) => {
    try {
      const orders = await Order.find({
        "cart.shopId": req.params.shopId,
      }).sort({
        createdAt: -1,
      });

      resp.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// UPDATE ORDER STATUS ONLY FOR SELLER
router.put(
  "/update-order-status/:id",
  isSeller,
  catchAsyncError(async (req, resp, next) => {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) {
        return next(new ErrorHandler("Order not found with this id!", 400));
      }

      if (
        req.body.status === "Transferred to delivery partner" ||
        req.body.status === "Delivered"
      ) {
        for (const o of order.cart) {
          await updateOrder(o.productId, o.qty);
        }
      }

      order.orderStatus = req.body.status;

      if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
        order.paymentInfo.status = "Succeeded";
        const serviceC = order.totalPrice * 0.1;
        await updateSelllerInfo(order.totalPrice - serviceC);
      }

      await order.save({ validateBeforeSave: false });

      resp.status(200).json({
        success: true,
        order,
      });

      async function updateOrder(id, qty) {
        if (!id) return; // skip if no id
        const product = await Product.findById(id);
        if (!product) return; // skip if product not found
        product.stock = Math.max(product.stock - qty, 0);
        product.sold_out += qty;
        await product.save({ validateBeforeSave: false });
      }
      async function updateSelllerInfo(amount) {
        const seller = await Shop.findById(req.seller.id);
        seller.availableBalance = amount;
        await seller.save();
      }
      console.log("Updating product:", o.productId, "Qty:", o.qty);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//GIVE A REFUND
router.put(
  "/order-refund/:id",
  catchAsyncError(async (req, resp, next) => {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) {
        return next(new ErrorHandler("Order not found with this id!", 400));
      }

      order.orderStatus = req.body.status;

      await order.save({ validateBeforeSave: false });

      resp.status(200).json({
        success: true,
        order,
        message: "Order Refund Request Successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// ACCEPT THE REFUND ---SELLER
router.put(
  "/order-refund-success/:id",
  isSeller,
  catchAsyncError(async (req, resp, next) => {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) {
        return next(new ErrorHandler("Order not found with this id", 400));
      }
      order.orderStatus = req.body.status;
      await order.save();
      resp.status(200).json({
        success: true,
        message: "Order refund successflly",
      });
      if (req.body.status === "Refund success") {
        for (const o of order.cart) {
          await updateOrder(o.productId, o.qty);
        }
      }

      async function updateOrder(id, qty) {
        const product = await Product.findById(id);

        product.stock += qty;
        product.sold_out -= qty;

        await product.save({ validateBeforeSave: false });
      }
    } catch (error) {}
  })
);

// GET ALL ORDERS FOR ---ADMIN
router.get(
  "/admin-all-orders",
  isAuthenticated,
  isAdmin("Admin"),

  catchAsyncError(async (req, resp, next) => {
    try {
      const orders = await Order.find().sort({
        deliveredAt: -1,
        createdAt: -1,
      });

      resp.status(201).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
