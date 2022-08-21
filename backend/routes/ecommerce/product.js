const express = require("express");
var router = express.Router();
const auth = require("../../middleware/auth");
const { JsonResponse, JsonResponseWithMSG } = require("../../utils/JsonResponse");
const PaymenVerify = require("../../utils/PaymentVerify");
const { MulterUpload, CloudinaryUpload } = require("../../utils/ImageManager");
const Product = require("../../models/ecommerce/product");
const ProductOrder = require("../../models/ecommerce/ProductOrder");
const fs = require("fs");
const User = require("../../models/common/User");
const { checkPreference } = require("../../utils/PreferenceManager");
const sendgrid = require("../../utils/sendgrid");

router.post("/add", [auth.authAdmin, MulterUpload.single("image")], async (req, res) => {
  const { name, price, description, category, availableQty } = req.body;
  if (!(name && price && description && category && availableQty)) {
    res.status(400).json(JsonResponse(false, "All input is required"));
  }
  let image = req.file.path;
  try {
    let product = await Product.create({
      owner: req.user.user_id,
      name,
      price,
      description,
      category,
      availableQty,
    });
    CloudinaryUpload(image)
      .then(async (result) => {
        product.image = result.url;
      })
      .catch((error) => {
        product.image = null;
      })
      .finally(async () => {
        await product.save();
        res.json(JsonResponse(true, product));
      });
  } catch (error) {
    res.status(500).json(JsonResponse(false, error.message));
  }
});
router.post("/update/:id", [auth.authAdmin, MulterUpload.single("image")], async (req, res) => {
  const { id } = req.params;
  const { name, price, description, category, availableQty } = req.body;

  let image = null;
  if (req.file) {
    image = req.file.path;
  }
  let product = {};
  if (name) product.name = name;
  if (price) product.price = price;
  if (description) product.description = description;
  if (category) product.category = category;
  if (availableQty) product.availableQty = availableQty;

  try {
    if (image) {
      const result = await CloudinaryUpload(image);
      product.image = result.url;
      fs.unlinkSync(image);
    }
    let final = await Product.findOneAndUpdate({ _id: id }, product, {
      new: true,
    });
    res.json(JsonResponse(true, final));
  } catch (error) {
    res.status(500).json(JsonResponse(false, error.message));
  }
});
router.post("/delete/:id", auth.authAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    await Product.deleteOne({ _id: id });
    res.json(JsonResponse(true, "Product deleted successfully"));
  } catch (e) {
    console.log(e);
    res.json(JsonResponse(false, "Error deleteing product"));
  }
});

router.post("/buy", auth.authUser, async (req, res) => {
  try {
    let { payload, items, name, address, city, phone } = req.body;

    totalCost = 0;
    let products = [];

    // Check if there is enough quantity
    for (const item of items) {
      let product = await Product.findById(item._id);
      products.push(product);
      if (product.availableQty < item.quantity) {
        return res.status(400).json(JsonResponse(false, "Not enough quantity."));
      }
    }

    // Validate total price
    items.forEach(async (item, index) => {
      totalCost += item.quantity * products[index].price;
      item.price = products[index].price;
      products[index].availableQty -= item.quantity;
    });

    let myproduct = [];

    // Save products with updated quantity
    await Promise.all(
      products.map(async (item, index) => {
        await item.save();
        myproduct.push({ product: item._id, quantity: items[index].quantity });
      })
    );
    let curStatus = await PaymenVerify(payload.token, totalCost * 100);
    console.log(curStatus);
    if (curStatus) {
      let order = await ProductOrder.create({
        products: myproduct,
        token: payload.token,
        name,
        address,
        city,
        phone,

        totalCost,
        buyer: req.user.user_id,
      });
      const foundUser = await User.findById(req.user.user_id);
      console.log(foundUser);
      sendgrid.sendProductOrderEmail(order, foundUser);
      res.json(JsonResponse(true, order));
    } else {
      console.log("Error Validating");
      res.status(400).json(JsonResponse(false, "Error Validating Payment"));
    }

    // Create a new order
  } catch (e) {
    res.status(400).json(JsonResponse(false, e.message));
  }
});

router.get("/view/:id", async (req, res) => {
  const { id } = req.params;
  let product = await Product.findOne({ _id: id })
    .populate({
      path: "reviews.user",
      select: "_id name username profile.photo email",
    })
    .populate("saves");
  if (product) {
    res.json(JsonResponse(true, product));
  } else {
    res.json(JsonResponse(false, "Product not found"));
  }
});
router.get("/", async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    // execute query with page and limit values
    const products = await Product.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate("saves")
      .sort("-createdAt")
      .exec();

    // get total documents in the Posts collection
    const count = await Product.countDocuments();

    // return response with posts, total pages, and current page
    res.json(
      JsonResponse(true, {
        products: products,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      })
    );
  } catch (err) {
    res.json(JsonResponse(false, err.message));
  }
});

// Filtered search items for shop
router.post("/filtered", async (req, res) => {
  const { page = 1, limit = 500 } = req.query;
  const { sportsFilter, ratingFilter, textFilter } = req.body;

  try {
    // execute query with page and limit values
    const products = await Product.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate("saves")
      .sort("-createdAt")
      .exec();
    let finalProducts = [...products];
    // Rating filter
    if (ratingFilter.length > 0) {
      finalProducts = finalProducts.filter((product) => {
        const sumValues = product.reviews.reduce((acc, curr) => acc + curr.reviewNumber, 0);
        const averageRating = product.reviews.length === 0 ? 0 : sumValues / product.reviews.length;
        return averageRating >= Number(ratingFilter);
      });
    }

    // Sports category filter
    if (sportsFilter.length > 0) {
      finalProducts = finalProducts.filter((product) =>
        sportsFilter.includes(product.category.toLowerCase())
      );
    }

    // Text input filter
    if (textFilter.length > 0) {
      finalProducts = finalProducts.filter((product) =>
        product.name.toLowerCase().includes(textFilter.toLowerCase())
      );
    }

    res.json(
      JsonResponse(true, {
        products: finalProducts,
        totalPages: 1,
        currentPage: page,
      })
    );
  } catch (err) {
    res.json(JsonResponse(false, err.message));
  }
});

// Function to save a product
router.post("/save/:id", auth.authUser, async (req, res) => {
  const { id } = req.params;
  try {
    let product = await Product.findOne({ _id: id });
    if (product) {
      let user = await User.findOne({ _id: req.user.user_id });
      if (user.profile.saved.products.includes(id)) {
        user.profile.saved.products.pull(id);
        await user.save();
        product.saves.pull(req.user.user_id);
        await product.save();
        product = await Product.findOne({ _id: id })
          .populate({
            path: "reviews.user",
            select: "_id name username profile.photo email",
          })
          .populate("saves");
        res.json(JsonResponseWithMSG(true, "Product Unsaved", product));
      } else {
        user.profile.saved.products.push(id);
        await user.save();
        user = await User.findOne({
          _id: req.user.user_id,
        });
        product.saves.push(req.user.user_id);
        await product.save();
        product = await Product.findOne({ _id: id })
          .populate({
            path: "reviews.user",
            select: "_id name username profile.photo email",
          })
          .populate("saves");
        res.json(JsonResponseWithMSG(true, "Product Saved", product));
      }
    } else {
      res.json(JsonResponse(false, "Product not found"));
    }
  } catch (err) {
    res.json(JsonResponse(false, err.message));
  }
});

// Create a new product review
router.post("/review/:id", auth.authUser, async (req, res) => {
  const newReview = {
    reviewNumber: req.body.reviewNumber,
    reviewText: req.body.reviewText,
    user: req.user.user_id,
  };
  try {
    const product = await Product.findById(req.params.id);
    product.reviews.push(newReview);

    await product.save();
    await product.populate({
      path: "reviews.user",
      select: "_id name username profile.photo email",
    });
    res.json(JsonResponse(true, product));
  } catch (err) {
    res.json(JsonResponse(false, err.message));
  }
});

router.get("/recomended", auth.authUserPublic, async (req, res) => {
  try {
    let products = await Product.find({});
    products = products
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
    final = products.slice(0, 3);
    if (req.user) {
      const user = await User.findOne({ _id: req.user.user_id });
      let recomendation = products.filter((product) => {
        return checkPreference(product.tags, user.profile.preferences);
      });

      let others = products.filter((product) => {
        return !checkPreference(product.tags, user.profile.preferences);
      });

      final = [...recomendation, ...others].slice(0, 3);
    }

    res.json(JsonResponse(true, final));
  } catch (err) {
    res.json(JsonResponse(false, err.message));
  }
});

module.exports = router;
