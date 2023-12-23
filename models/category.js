const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: String,
  weight: Number,
  assignments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assignment' // Reference to Assignment model
  }],
  totalPoints: Number,
  totalMaxPoints: Number,
});

module.exports = mongoose.model('Category', categorySchema);
