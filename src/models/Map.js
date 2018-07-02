const mongoose = require('mongoose');

const mapSchema = mongoose.Schema({
  username: String,
  id: String,
  level: String,
  no: String
});

module.exports = mapSchema;