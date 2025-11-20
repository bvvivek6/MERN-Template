const express = require("express");
const cors = require("cors");
require("dotenv").config();
const morgan = require("morgan");
const mongoose = require("mongoose");
const helmet = require("helmet");
const authRoutes = require("./routes/authRouter");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/merntemplate";

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error", err.message));

app.use("/api/v1/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
