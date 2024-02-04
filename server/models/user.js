const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  googleid: String,
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
});

// compile model from schema
module.exports = mongoose.model("User", UserSchema);
