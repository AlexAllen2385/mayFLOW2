const mongoose = require("mongoose");

const pagerSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  pagerplayer: String,
  pagerid: String,
  pagertagid: String
});

module.exports = mongoose.model("Pagers", pagerSchema);
