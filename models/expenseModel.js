const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    task: {
      type: String,
      required: true,
    },
    cost: {
      type: Number,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Expenses", expenseSchema);
