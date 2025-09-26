const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String
});

// Create the model
const UserModel = mongoose.model("Users", UserSchema);

// Export the model
module.exports = UserModel;
