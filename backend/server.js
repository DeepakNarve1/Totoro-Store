const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db"); // importing the connectDB function from db.js
const userRoutes = require("./routes/userRoutes"); // importing user routes
const productRoutes = require("./routes/productRoutes"); // importing product routes
const cartRoutes = require("./routes/cartRoutes");
const checkoutRoutes = require("./routes/checkoutRoutes");
const orderRoutes = require("./routes/orderRoutes"); // importing order routes
const uploadRoutes = require("./routes/uploadRoutes"); // importing upload routes
const subscribeRoute = require("./routes/subscribeRoute"); // importing subscriber routes
const adminRoutes = require("./routes/adminRoutes"); // importing admin routes
const adminProductRoutes = require("./routes/productAdminRoutes"); // importing product admin routes
const adminOrderRoutes = require("./routes/adminOrderRoutes"); // importing order admin routes

const app = express(); // initializing an application using express
app.use(express.json());
app.use(cors((origin = "https://totoro-rose.vercel.app")));

dotenv.config(); // loading environment variables from .env file

const PORT = process.env.PORT || 3000; // setting the port to listen on

// Connecting to MongoDB
connectDB();

app.get("/", (req, res) => {
  res.send("WELCOME TO TODORO API!");
});

// API Routes
app.use("/api/users", userRoutes); // using user routes
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes); // using upload routes
app.use("/api", subscribeRoute); // using subscriber routes

// Admin Routes
app.use("/api/admin/users", adminRoutes); // using admin routes
app.use("/api/admin/products", adminProductRoutes);
app.use("/api/admin/orders", adminOrderRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
