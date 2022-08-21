const mongoose = require('mongoose');

const ProductOrderSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
        quantity: {},
      },
    ],
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    totalCost: { type: Number, required: true },
    token: {
      type: String,
    },
    name: {
      type: String,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    phone: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const ProductOrder = mongoose.model('ProductOrder', ProductOrderSchema);

module.exports = ProductOrder;
