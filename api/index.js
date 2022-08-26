import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import postRoutes from "../routes/posts.js";
import userRoutes from "../routes/users.js";
import dotenv from "dotenv";
const app = express();
dotenv.config();

if (process.env.IS_VERCEL) {
  app.use(async (req, res, next) => {
    await mongoose.connect(process.env.CONNECTION_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    return next();
  });
}

app.use(bodyParser.json({ limit: "30mb", extedned: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extedned: true }));
app.use(cors());

app.use("/posts", postRoutes);
app.use("/user", userRoutes);

export default app;