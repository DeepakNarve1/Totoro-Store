const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./model/Product");
const User = require("./model/User");
const products = require("./data/products");

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI);

// Function to send data

const seedData = async () => {
  try {
    // Clear existing data
    await Product.deleteMany();
    await User.deleteMany();

    // Create a default admin user
    const createdUser = await User.create({
      name: "Admin",
      email: "admin@example.com",
      password: "123456",
      role: "admin",
    });

    // Assigh the default ID to each products
    const userID = createdUser._id;

    const sampleProducts = products.map((product) => {
      return {
        ...product,
        user: userID, // Assign the admin user ID to each product
      };
    });

    // Insert sample products into the database
    await Product.insertMany(sampleProducts);

    console.log("Product data seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seedData();
// Close the database connection
