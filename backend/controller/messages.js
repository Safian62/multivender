const Messages = require("../model/messages");
const ErrorHandler = require("../utils/ErrorHandler");
const express = require("express");
const router = express.Router();
const { isSeller } = require("../middleware/auth");
const catchAsyncError = require("../middleware/catchAsyncError");
const { upload } = require("../multer");
const path = require('path')

// CREATE A NEW MESSAGE

router.post(
  "/create-new-message",
  upload.single("images"),
  catchAsyncError(async (req, resp, next) => {
    try {
      const messageData = req.body;

      if (req.file) {
        const filename = req.file.filename;
        const fileUrl = path.join(filename)
        messageData.images = fileUrl
      }

      messageData.conservationId = req.body.conservationId;
      messageData.sender = req.body.sender;
      messageData.text = req.body.text;

      const message = new Messages({
        conservationId: messageData.conservationId,
        text: messageData.text,
        sender: messageData.sender,
        images:  messageData.images ?  messageData.images : undefined,
      });

      await message.save();

      resp.status(201).json({
        success: true,
        message,
      });
    } catch (error) {
      return next(new ErrorHandler(error.response.message, 500));
    }
  })
);

// GET ALL MESSAGES WITH CONSERVATION ID

router.get(
  "/get-all-messages/:id",
  catchAsyncError(async (req, resp, next) => {
    try {
      const messages = await Messages.find({
        conservationId: req.params.id,
      });

      resp.status(201).json({
        success: true,
        messages,
      });
    } catch (error) {
      return next(new ErrorHandler(error.response.message, 500));
    }
  })
);

module.exports = router;
