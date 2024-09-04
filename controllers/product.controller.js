const productModel = require("../models/product.model");
const mongoose = require("mongoose");

const addProduct = async (req, res) => {
  try {
    const { name, brand, category, price, quantity } = req.body;
    if (!name || !brand || !category || !price || !quantity) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields." });
    }

    const product = await productModel.create({
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
};

const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    if (!products) {
      return res.status(400).json({ message: "Not Found!" });
    }
    res.status(200).json({ message: "Success", data: products });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `Server side error: ${err?.message}` });
  }
};

const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: `Id is not valid.` });
    }

    const product = await productModel.findById({ _id: id });
    if (!product) {
      return res.status(404).json({ message: `Product not found.` });
    }

    res.status(200).json({ message: "Success", data: product });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `Server side error: ${err?.message}` });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: `Id is not valid.` });
    }
    const updateProduct = await productModel.findByIdAndUpdate(
      id,
      updatedData,
      {
        new: true, // to return updated document
        runValidators: true, // ensure the updated data is validated against schema
      }
    );
    if (!updateProduct) {
      return res.status(404).json({ message: `Product not found.` });
    }

    res
      .status(200)
      .json({ message: "Product updated successfully.", data: updateProduct });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `Server side error: ${err?.message}` });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: `Id is not valid.` });
    }
    const deletedProduct = await productModel.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: `Product not found.` });
    }
    res
      .status(200)
      .json({
        message: `Deleted a product successfully.`,
        data: deletedProduct,
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `Server side error: ${err?.message}` });
  }
};

module.exports = { addProduct, getAllProducts, getProduct, updateProduct, deleteProduct };
