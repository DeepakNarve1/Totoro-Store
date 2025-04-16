const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db"); // importing the connectDB function from db.js
const userRoutes = require("./routes/userRoutes"); // importing user routes
const productRoutes = require("./routes/productRoutes"); // importing product routes
const cartRoutes = require("./routes/cartRoutes"); 
const checkoutRoutes = require("./routes/checkoutRoutes");

const app = express(); // initializing an application using express
app.use(express.json());
app.use(cors());

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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
