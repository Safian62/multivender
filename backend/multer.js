const path = require("path");
const fs = require("fs");
const multer = require("multer");

// Absolute path to uploads folder
const uploadDir = path.join("/tmp", "uploads");

// Make sure folder exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // write to backend/uploads
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "_" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const filename = file.originalname.replace(ext, "").replace(/\s+/g, "_");
    cb(null, `${filename}_${uniqueSuffix}${ext}`);
  },
});

exports.upload = multer({ storage });
