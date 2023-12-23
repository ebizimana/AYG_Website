const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  name: String,
  grade: Number,
  maxPoints: Number,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category' // Reference to Category model
  }
});

module.exports = mongoose.model('Assignment', assignmentSchema);

