// Imports
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongo = require("./utils/mongo");
var cloudinary = require("cloudinary").v2;
//Import Routes
const authRoute = require("./routes/common/auth");
const profileRoute = require("./routes/common/profile");
const productRoute = require("./routes/ecommerce/product");
const orderRoute = require("./routes/ecommerce/orders");
const userRoute = require("./routes/common/user");
const postRoute = require("./routes/social-media/post");
const conversationRoute = require("./routes/chat/conversations");
const messageRoute = require("./routes/chat/messages");
const challengeRoute = require("./routes/common/challenge");
const auth = require("./middleware/auth");

// Express Setup
const app = express();
app.use(cors());
app.use(express.json());

//Database Setup
mongo.initiateDBConnection();
//

/// Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

app.use("/auth", authRoute);
app.use("/profile", profileRoute);
app.use("/product", productRoute);
app.use("/orders", orderRoute);
app.use("/user", userRoute);
app.use("/post", postRoute);
app.use("/venue", require("./routes/venue/venue"));
app.use("/conversation", conversationRoute);
app.use("/message", messageRoute);
app.use("/challenge", challengeRoute);

//Server Listen
app.listen(8000, () => {
  console.log("Server is running at port 8000");
});
