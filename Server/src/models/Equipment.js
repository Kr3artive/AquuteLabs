const mongoose = require("mongoose");

const EquipmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    lessee: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    availability: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AqquteEquipments", EquipmentSchema);
