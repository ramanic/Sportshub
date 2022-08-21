const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema(
  {
    photo: {
      type: String,
      require: false,
      default:
        "https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg",
    },
    preferences: [{ type: String }],
    phone: { type: String, require: false },
    bio: { type: String, require: false },
    address: {
      district: { type: String, require: false },
      city: { type: String, require: false },
    },
    saved: {
      posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
      products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
      venues: [{ type: mongoose.Schema.Types.ObjectId, ref: "Venue" }],
    },
    friends: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        status: {
          type: String,
          enum: ["accepted", "sent", "received"],
        },
        sent: {
          type: Date,
        },
        accepted: {
          type: Date,
        },
      },
    ],
  },
  { timestamps: true }
);

const Profile = mongoose.model("Profile", ProfileSchema);

module.exports = { Profile, ProfileSchema };
