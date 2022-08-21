const jwt = require("jsonwebtoken");
const User = require("../models/common/User");
const { JsonResponse } = require("./../utils/JsonResponse");

const config = process.env;

const authUser = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).json(JsonResponse(false, "A token is required for authentication"));
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).json(JsonResponse(false, "Invalid token."));
  }
  return next();
};
const authUserPublic = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers["x-access-token"];

  if (token) {
    try {
      const decoded = jwt.verify(token, config.TOKEN_KEY);
      req.user = decoded;
    } catch (err) {
      return next();
    }
  }
  return next();
};
const authAdmin = async (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).json(JsonResponse(false, "A token is required for authentication"));
  }

  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
    let admin = await User.findOne({ _id: req.user.user_id });
    if (admin.role === "admin") {
      return next();
    } else {
      return res
        .status(403)
        .json(JsonResponse(false, "You are not authorized to perform the action."));
    }
  } catch (err) {
    return res.status(401).json(JsonResponse(false, "Authentication error."));
  }
};

module.exports = { authUser, authAdmin, authUserPublic };
