const path = require("path");
const fs = require("fs");
const multer = require("multer");

const uploadDir = path.join("/tmp", "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); 
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "_" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const filename = file.originalname.replace(ext, "").replace(/\s+/g, "_");
    cb(null, `${filename}_${uniqueSuffix}${ext}`);
  },
});

exports.upload = multer({ storage });
