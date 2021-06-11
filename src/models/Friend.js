const mongoose = require("mongoose");
const VarSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Friend", VarSchema);
