import express from "express";
import dotenv from "dotenv";
import multer from "multer";

const __dirname = import.meta.dirname;

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.get("/", (req, res) => {
  res.status(200).sendFile(__dirname + "/public/index.html");
});

app.post("/submit-file", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  if (req.file) {
    res.status(202).json({
      name: req.file.originalname,
      size: req.file.size,
      type: req.file.mimetype,
    });
  }
});

app.listen(PORT);
console.log(`Server is listening to port ${PORT}`);
