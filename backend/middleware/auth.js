const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const Shop = require("../model/shop");

// ----------------------------
// Check if Normal User is Authenticated
// ----------------------------
exports.isAuthenticated = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please login to continue", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.id);

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    req.user = user;
    next();
  } catch (err) {
    return next(new ErrorHandler("Invalid or expired token", 401));
  }
});

// ----------------------------
// Check if Seller is Authenticated
// ----------------------------
exports.isSeller = catchAsyncError(async (req, res, next) => {
  const { seller_token } = req.cookies;

  if (!seller_token) {
    return next(new ErrorHandler("Please login to continue", 401));
  }

  try {
    const decoded = jwt.verify(seller_token, process.env.JWT_SECRET_KEY);
    const shop = await Shop.findById(decoded.id);

    if (!shop) {
      return next(new ErrorHandler("Shop not found", 404));
    }

    req.seller = shop;
    next();
  } catch (err) {
    return next(new ErrorHandler("Invalid or expired seller token", 401));
  }
});

// ----------------------------
// Check if User is Admin
// ----------------------------
exports.isAdmin = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `${req.user?.role || "Guest"} cannot access this resource`,
          403
        )
      );
    }
    next();
  };
};
