const ErrorHandler = require("../utils/ErrorHandler");
const express = require("express");
const router = express.Router();
const { isSeller, isAdmin, isAuthenticated } = require("../middleware/auth");
const catchAsyncError = require("../middleware/catchAsyncError");
const Withdraw = require("../model/withdraw");
const sendMail = require("../utils/sendMail");
const Shop = require("../model/shop");

// CREATE A WITHDRAW REQUEST ONLY FOR  ---SELLER

router.post(
  "/create-withdraw-request",
  isSeller,
  catchAsyncError(async (req, resp, next) => {
    try {
      const { amount } = req.body;
      const data = {
        seller: req.seller,
        amount,
      };
      try {
        await sendMail({
          email: req.seller.email,
          subject: "Withdraw Request",
          message: `Hello ${req.seller.name}, Your withdraw request of${amount}$  is processing. Please wait for 3 to 7 days for processing. `,
        });

        resp.status(201).json({
          success: true,
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
      const withdraw = await Withdraw.create(data);

      const shop = await Shop.findById(req.seller._id);

      shop.availableBalance = shop.availableBalance - amount;

      await shop.save();

      resp.status(201).json({
        success: true,
        withdraw,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// GET ALL WITHDRAW REQUEST FOR ---ADMIN

router.get(
  "/get-all-withdraw-request",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncError(async (req, resp, next) => {
    try {
      const withdraws = await Withdraw.find().sort({ createdAt: -1 });
      resp.status(201).json({
        success: true,
        withdraws,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// UPDATE WITHDRAW REQUEST STATUS

router.put(
  "/update-withdraw-request/:id",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncError(async (req, resp, next) => {
    try {
      const { sellerId } = req.body;
      const withdraw = await Withdraw.findByIdAndUpdate(
        req.params.id,
        {
          status: "succeed",
          updatedAt: Date.now(),
        },
        { new: true }
      );

      const seller = await Shop.findById(sellerId);

      const transection = {
        _id: withdraw._id,
        amount: withdraw.amount,
        updatedAt: withdraw.updatedAt,
        status: withdraw.status,
      };

      seller.transection = [...seller.transection, transection];
      await seller.save();

      try {
        await sendMail({
          email: seller.email,
          subject: "Payment confirmation",
          message: `Hello ${seller.name}, you withdraw request of ${withdraw.amount}$ is on the way. Delivery time depend on you bank rules. it usually takes 3 to 7 days. `,
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }

      resp.status(201).json({
        success: true,
        withdraw,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
