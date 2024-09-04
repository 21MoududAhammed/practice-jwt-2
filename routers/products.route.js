const express = require("express");
const router = express.Router();
const { verifyJwtAndAdmin } = require("../middlewares/auth.middleware");
const { addProduct, getAllProducts, getProduct, updateProduct, deleteProduct } = require("../controllers/product.controller");

// add a product
router.post("/", verifyJwtAndAdmin, addProduct);

// get all products
router.get("/", verifyJwtAndAdmin, getAllProducts);

// get a product by id 
router.get("/:id", verifyJwtAndAdmin ,getProduct)

// update a product 
router.put("/:id", verifyJwtAndAdmin, updateProduct)

// delete a product 
router.delete("/:id", verifyJwtAndAdmin, deleteProduct)



module.exports = router;
