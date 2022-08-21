const mongoose = require("mongoose");
const Profile = require("./Profile");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, default: null, require: true },
    email: { type: String, unique: true, require: true },
    password: { type: String, require: false, select: false },
    username: { type: String, unique: true, default: null },
    token: { type: String },
    role: {
      type: String,
      enum: ["admin", "user", "venueOwner"],
      default: "user",
    },
    passwordResetString: { type: String },
    profile: Profile.ProfileSchema,
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
