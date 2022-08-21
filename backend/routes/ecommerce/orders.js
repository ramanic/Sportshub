const express = require("express");
var router = express.Router();
const auth = require("../../middleware/auth");
const { JsonResponse } = require("../../utils/JsonResponse");
const ProductOrder = require("../../models/ecommerce/ProductOrder");

router.get("/all", auth.authAdmin, async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    // execute query with page and limit values
    const orders = await ProductOrder.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate("products.product")
      .populate("buyer")
      .sort("-createdAt")
      .exec();

    // get total documents in the Posts collection
    const count = await ProductOrder.countDocuments();

    // return response with posts, total pages, and current page
    res.json(
      JsonResponse(true, {
        orders,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      })
    );
  } catch (err) {
    res.json(JsonResponse(false, err.message));
  }
});

router.get("/my", auth.authUser, async (req, res) => {
  console.log("AAA");
  const { page = 1, limit = 100 } = req.query;

  try {
    // execute query with page and limit values
    const orders = await ProductOrder.find({ buyer: req.user.user_id })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate("products.product")
      .sort("-createdAt")
      .exec();

    // get total documents in the Posts collection
    const count = await ProductOrder.countDocuments();

    // return response with posts, total pages, and current page
    res.json(
      JsonResponse(true, {
        orders,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      })
    );
  } catch (err) {
    res.json(JsonResponse(false, err.message));
  }
});

module.exports = router;
