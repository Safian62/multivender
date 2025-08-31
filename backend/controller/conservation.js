const Conservation = require("../model/conservation");
const ErrorHandler = require("../utils/ErrorHandler");
const express = require("express");
const router = express.Router();
const { isSeller, isAuthenticated } = require("../middleware/auth");
const catchAsyncError = require("../middleware/catchAsyncError");

// CREATE A NEW CONSERVATION

router.post(
  "/create-new-conservation",
  catchAsyncError(async (req, resp, next) => {
    try {
      const { groupTittle, userId, sellerId } = req.body;

      const isConservationExists = await Conservation.findOne({ groupTittle });
      if (isConservationExists) {
        const conservation = isConservationExists;
        resp.status(201).json({
          success: true,
          conservation,
        });
      } else {
        const conservation = await Conservation.create({
          members: [userId, sellerId],
          groupTittle: groupTittle,
        });

        resp.status(201).json({
          success: true,
          conservation,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error.response.message, 500));
    }
  })
);

// GET ALL CONSERVATION FOR SELLER CONSERVATION

router.get(
  "/get-all-conservation-seller/:id",
  isSeller,
  catchAsyncError(async (req, resp, next) => {
    try {
      const conservation = await Conservation.find({
        members: {
          $in: [req.params.id],
        },
      }).sort({ updatedAt: -1, createdAt: -1 });

      resp.status(201).json({
        success: true,
        conservation,
      });
    } catch (error) {
      return next(new ErrorHandler(error, express.response.message, 500));
    }
  })
);

// GET ALL CONSERVATION FOR USER

router.get(
  "/get-all-conservation-user/:id",
  isAuthenticated,
  catchAsyncError(async (req, resp, next) => {
    try {
      const conservation = await Conservation.find({
        members: {
          $in: [req.params.id],
        },
      }).sort({ updatedAt: -1, createdAt: -1 });

      resp.status(201).json({
        success: true,
        conservation,
      });
    } catch (error) {
      return next(new ErrorHandler(error, express.response.message, 500));
    }
  })
);

// UPDATE LAST MESSAGE

router.put(
  "/update-last-message/:id",
  catchAsyncError(async (req, resp, next) => {
    try {
      const { lastMessage, lastMessageId } = req.body;

      const conservation = await Conservation.findByIdAndUpdate(req.params.id, {
        lastMessage: lastMessage,
        lastMessageId,
      });

      resp.status(201).json({
        success: true,
        conservation,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

module.exports = router;
