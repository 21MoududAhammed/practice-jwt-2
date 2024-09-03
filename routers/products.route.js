const express = require("express");
const router = express.Router();
const userModel = require("../models/product.model");
const { verifyJwtAndAdmin } = require("../middlewares/auth.middleware");

// add a product
router.post("/", verifyJwtAndAdmin, async (req, res) => {
  try {
    const { name, brand, category, price, quantity } = req.body;
    if (!name || !brand || !category || !price || !quantity) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields." });
    }

    const product = await userModel.create({
      name,
      brand,
      category,
      price,
      quantity,
    });

    res.status(201).json({ message: "Success", data: product });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `Server side error: ${err?.message}` });
  }
});



module.exports = router;
