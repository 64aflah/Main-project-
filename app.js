const express = require("express");
const fileUpload = require("express-fileupload");
const classifyRoute = require("./routes/classify");

const app = express();
app.use(express.json());
app.use(fileUpload());

// Routes
app.use("/classify", classifyRoute);

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
