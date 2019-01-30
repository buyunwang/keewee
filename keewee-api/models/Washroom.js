const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");

const WashroomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  long: {
    type: Number,
    required: true
  },
  lat: {
    type: Number,
    required: true
  },
  address: {
    type: String,
    required: false,
    trim: true
  },
  wheelchair: {
    type: Boolean,
    default: false
  }
});

WashroomSchema.plugin(timestamp);

const Washroom = mongoose.model("Washroom", WashroomSchema);
module.exports = Washroom;
