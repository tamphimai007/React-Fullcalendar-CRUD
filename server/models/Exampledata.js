const mongoose = require("mongoose");

const exampledataSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    filename: {
      type: String,
    },
    datestart: {
      type: Date,
    },
    end: {
      type: Date,
    },
    color: {
      type: String,
    },
    allDay: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = Exampledata = mongoose.model("exampledata", exampledataSchema);
