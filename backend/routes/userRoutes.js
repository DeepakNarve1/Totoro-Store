const express = require("express");
const User = require("../model/User");
const jwt = require("jsonwebtoken");

const router = express.Router();

// @route POST /api/users/register
// @desc Register a new user
// @access Public

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Registration logic
    let user = await User.findOne({ email });

    if (user) return res.status(400).json({ message: "User already exists" });

    user = new User({
      name,
      email,
      password,
    });
    await user.save();

    //  Create JWT Payload
    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    // Sign and return the token along with user details
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;

        //    Sent response with token and user details
        res.status(201).json({
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      }
    );
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send("Server Error");
  }
});

// @route POST /api/users/login
// @desc Login user and get token
// @access Public
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    let user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    const isMatch = await user.matchPassword(password);

    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    //  Create JWT Payload
    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    // Sign and return the token along with user details
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;

        //    Sent response with token and user details
        res.json({
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      }
    );
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
