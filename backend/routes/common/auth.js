const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var router = express.Router();
const User = require("../../models/common/User");
const { Profile } = require("../../models/common/Profile");
const sendgrid = require("../../utils/sendgrid");

const { JsonResponse } = require("./../../utils/JsonResponse");
const passport = require("../../utils/PassportGoogle");
router.use(passport.initialize());

router.post("/register", async (req, res) => {
  // Our register logic starts here
  try {
    // Get user input
    const { username, name, email, password } = req.body;

    // Validate user input
    if (!(email && password && name && username)) {
      res.status(400).json(JsonResponse(false, "All input is required"));
    }

    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send(JsonResponse(false, "Email Already Exist."));
    }
    const oldUser2 = await User.findOne({ username });
    if (oldUser2) {
      return res.status(409).send(JsonResponse(false, "Username Already Exist."));
    }

    encryptedPassword = await bcrypt.hash(password, 10);
    const profile = await Profile.create({});
    const user = await User.create({
      name,
      username,
      profile: profile,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    const token = jwt.sign({ user_id: user._id, email }, process.env.TOKEN_KEY, {
      // expiresIn: '2h',
    });

    user.token = token;
    sendgrid.sendRegistrationSuccessEmail(user);
    res.status(201).json(JsonResponse(true, user));
  } catch (err) {
    console.log(err);
  }
});
router.post("/login", async (req, res) => {
  // Our login logic starts here
  try {
    // Get user input
    const { password, username } = req.body;

    if (!(username && password)) {
      res.status(400).send(JsonResponse(false, "All input is required"));
    }

    var user = null;

    user = await User.findOne({
      $or: [{ username: username }, { email: username }],
    })
      .select("+password")
      .exec();

    console.log(user);
    if (user == null) {
      return res.status(404).send(JsonResponse(false, "Invalid Username"));
    }
    console.log(password);
    console.log(user);

    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ user_id: user._id, email: user.email }, process.env.TOKEN_KEY, {
        // expiresIn: '2h',
      });

      user.token = token;

      res.status(200).json(JsonResponse(true, user));
    } else {
      res.status(400).send(JsonResponse(false, "Invalid Credentials"));
    }
  } catch (err) {
    res.status(400).send(JsonResponse(false, "Invalid Credentials"));

    console.log(err);
  }
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: process.env.FRONTEND_URL + "/auth/callback?error=true",
    session: false,
  }),
  (req, res) => {
    res.redirect(
      process.env.FRONTEND_URL + "/auth/callback?token=" + req.user.token + "&new=" + req.user.new
    );
  }
);

module.exports = router;
