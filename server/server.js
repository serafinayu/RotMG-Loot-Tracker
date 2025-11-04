import express from "express";
import cors from "cors"; // Lets you communicate with database from an IP
import "dotenv/config"; // Allows you to use environment variables in .env
import connectDB from "./config/mongodb.js";
import userRouter from "./routes/userRoute.js";
import collectionRouter from "./routes/collectionRoute.js";

// App Config
const app = express(); // Create Express application instance
const port = process.env.PORT || 4000; // Set port to environment variable or default to 4000

// Middleware
app.use(express.json()); //
app.use(cors()); // Backend can be used from any IP

app.get("/api/test", (req, res) => {
  res.json({ message: "API is working", timestamp: new Date() });
});

// Route mounting - connects routers to specific URl prefixes
app.use("/api/user", userRouter);
app.use("/api/collection", collectionRouter);

// Basic endpoint to verify server is running
app.get("/", (req, res) => {
  res.send("API Working");
});

// Server startup and log confirmation

try {
  await connectDB(); // Connect to the database
  app.listen(port, () => console.log("Server started on PORT " + port));
} catch (err) {
  console.error("Error starting API: ", err.message);
  process.exit(1);
}
