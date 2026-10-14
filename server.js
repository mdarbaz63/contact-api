import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.js";
import contactRouter from "./routes/contact.js";

const app = express();

// Middleware: routes se pehle
app.use(express.json());

// User routes
app.use("/api/user", userRouter);

// Contact routes
app.use("/api/contact", contactRouter);

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "this is a home route",
  });
});

// Database connection
mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: "api_data",
  })
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log("disconnected database", err.message);
  });

// Server
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
