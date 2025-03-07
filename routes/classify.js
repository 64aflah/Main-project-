const express = require("express");
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

const router = express.Router();

router.post("/", (req, res) => {
  if (!req.files || !req.files.image) {
    return res.status(400).json({ error: "No image uploaded" });
  }

  const image = req.files.image;
  const uploadPath = path.join(__dirname, "../uploads", image.name);

  image.mv(uploadPath, (err) => {
    if (err) return res.status(500).json({ error: "File upload failed" });

    const pythonScript = path.join(__dirname, "../scripts/predict.py");

    exec(`python ${pythonScript} ${uploadPath}`, (error, stdout, stderr) => {
      if (error) return res.status(500).json({ error: "Prediction failed", details: stderr });

      res.json({ prediction: stdout.trim() });
    });
  });
});

module.exports = router;
