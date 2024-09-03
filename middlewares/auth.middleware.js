const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

const verifyJwtAndAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Authorization token is missing or invalid." });
    }
    const token = authHeader.split(" ")[1];
    // verify the token
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findOne({ _id: decoded._id });
    if (!user || !user.isAdmin) {
     return res.status(403).json({ message: "Access denied. Admins only." });
    }
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: `Authentication Failed: ${err?.message}` });
  }
};

module.exports = { verifyJwtAndAdmin };
