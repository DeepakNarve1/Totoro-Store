const express = require("express");
const Cart = require("../model/Cart");
const Product = require("../model/Product");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Helper Function to get cart based on userId or guestId
const getCart = async (userId, guestId) => {
  if (userId) {
    return await Cart.findOne({ user: userId });
  } else if (guestId) {
    return await Cart.findOne({ guestId });
  }
  return null;
};

// @route POST /api/cart
// @desc Add product to the cart fora guest or logged in user
// @access Public
router.post("/", async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Determine if the user is logged in or a guest
    let cart = await getCart(userId, guestId);

    // If the cart exists, update it
    if (cart) {
      const productIndex = cart.products.findIndex(
        (item) =>
          item.productId.toString() === productId &&
          item.size === size &&
          item.color === color
      );

      if (productIndex > -1) {
        // Product already in cart, update quantity
        cart.products[productIndex].quantity += quantity;
      } else {
        // Product not in cart, add it
        cart.products.push({
          productId,
          name: product.name,
          image: product.images[0],
          price: product.price,
          size,
          color,
          quantity,
        });
      }

      // Recalculate the total price
      cart.totalPrice = cart.products.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      await cart.save();
      return res.status(200).json(cart);
    } else {
      // Create a new cart for the user or guest
      const newCart = await Cart.create({
        user: userId ? userId : undefined,
        guestId: guestId ? guestId : "quest_" + new Date().getTime(),
        products: [
          {
            productId,
            name: product.name,
            image: product.images[0].url,
            price: product.price,
            size,
            color,
            quantity,
          },
        ],
        totalPrice: product.price * quantity,
      });

      return res.status(201).json(newCart);
    }
  } catch (error) {
    console.error("Error adding product to cart:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route GET /api/cart
// @desc Updaet product quantity in the cart for a logged in user
// @access Public
router.put("/", async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;

  try {
    let cart = await getCart(userId, guestId);
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const productIndex = cart.products.findIndex(
      (item) =>
        item.productId.toString() === productId &&
        item.size === size &&
        item.color === color
    );

    if (!productIndex > -1) {
      // Update quantity
      if (quantity > 0) {
        cart.products[productIndex].quantity = quantity;
      } else {
        cart.products.splice(productIndex, 1); // Remove product if quantity is 0
      }

      cart.totalPrice = cart.products.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      await cart.save();
      return res.status(200).json(cart);
    } else {
      return res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    console.error("Error updating product in cart:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// @route DELETE /api/cart
// @desc Remove product from the cart
// @access Public
router.delete("/", async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;

  try {
    let cart = await getCart(userId, guestId);
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const productIndex = cart.products.findIndex(
      (item) =>
        item.productId.toString() === productId &&
        item.size === size &&
        item.color === color
    );

    if (!productIndex > -1) {
      cart.products.splice(productIndex, 1); // Remove product from cart

      cart.totalPrice = cart.products.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      await cart.save();
      return res.status(200).json(cart);
    } else {
      return res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    console.error("Error updating product in cart:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// @route GET /api/cart
// @desc Get cart for a logged in user or guest
// @access Public
router.get("/", async (req, res) => {
  const { guestId, userId } = req.body;

  try {
    const cart = await getCart(userId, guestId);
    if (cart) {
      return res.json(cart);
    } else {
      return res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    console.error("Error updating product in cart:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// @route POST /api/cart/merge
// @desc Merge guest cart with user cart on login
// @access Private
router.post("/merge", protect, async (req, res) => {
  const { guestId } = req.body;

  try {
    // Find the guest cart and user cart
    const guestCart = await Cart.findOne({ guestId });
    const userCart = await Cart.findOne({ user: req.user._id });

    if (guestCart) {
      if (guestCart.products.length === 0) {
        return res.status(404).json({ message: "Guest cart is empty" });
      }
      if (userCart) {
        // Merge products from guest cart to user cart
        guestCart.products.forEach((guestProduct) => {
          const productIndex = userCart.products.findIndex(
            (item) =>
              item.productId.toString() === guestProduct.productId.toString() &&
              item.size === guestProduct.size &&
              item.color === guestProduct.color
          );

          if (productIndex > -1) {
            // If the items exists in the user cart, update the quantity
            userCart.products[productIndex].quantity += guestProduct.quantity;
          } else {
            //  Otherwise, add the guest item to the user cart
            userCart.products.push(guestProduct);
          }
        });

        userCart.totalPrice = userCart.products.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
        await userCart.save();

        // Remove the guest cart after merging
        try {
          await Cart.findOneAndDelete({ guestId });
        } catch (error) {
          console.error("Error deleting guest cart:", error);
        }
        res.status(200).json(userCart);
      } else {
        // If the user has no existing cart, just assign the guest cart to the user
        guestCart.user = req.user._id;
        guestCart.guestId = undefined; // Remove guestId
        await guestCart.save();

        res.status(200).json(guestCart);
      }
    } else {
        if (userCart) {
            // Guest cart has already been merged, return the user cart
        return res.status(200).json(userCart);
        }
        res.status(404).json({ message: "Guest cart not found" });
    }
  } catch (error) {
    console.error("Error merging carts:", error);
    res.status(500).json({ message: "Server error" });
    
  }
});

module.exports = router;
