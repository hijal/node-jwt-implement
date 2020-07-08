const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

const auth = async (req, res, next) => {
  try {
    const token = req.header("auth-token"); //.replace("Bearer ", "");
    
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findOne({
      where: {
        id: decoded.id,
      },
    });
    if (!user) {
      throw new Error();
    }
    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({
      error: "please ! authenticate.",
    });
  }
};

module.exports = auth;
