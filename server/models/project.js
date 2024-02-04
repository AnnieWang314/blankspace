const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  name: String,
  purpose: String,
  text: String,
});

// compile model from schema
module.exports = mongoose.model("Project", ProjectSchema);
