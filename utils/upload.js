const express = require("express");
const multer = require("multer");
const slugify = require("slugify");
const path = require("path");
const fs = require("fs-extra");

const router = express.Router();


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "..", "uploads", req.body.department || "general");
    fs.ensureDirSync(uploadPath); 
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const sanitizedFilename = slugify(file.originalname, { lower: true });
    cb(
      null,
      sanitizedFilename.split(".")[0] +
        "-" +
        uniqueSuffix +
        path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 20 * 1024 * 1024, 
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png", "application/vnd.ms-excel"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("File type not allowed"), false);
    }
  },
});


router.post("/upload", upload.array("files", 10), async (req, res) => {
  console.log(upload)
  try {
    const fileDetails = req.files.map((file) => ({
      path: `/uploads/${req.body.department || "general"}/${file.filename}`,
      originalName: file.originalname,
      uploadDate: new Date(),
      department: req.body.department || "general",
      uploadedBy: req.body.uploadedBy, // Could be user ID from the session or token
    }));

    // Save file details to the database here if needed
    // await FileModel.insertMany(fileDetails);

    res.status(200).json({
      message: "Files uploaded successfully",
      files: fileDetails,
    });
  } catch (error) {
    res.status(500).json({ message: "File upload failed", error: error.message });
  }
});

module.exports = router;
