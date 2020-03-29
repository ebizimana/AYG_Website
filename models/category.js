var mongoose = require('mongoose')

var categorySchema = new mongoose.Schema({
    name: String,
    weight: Number,
    totalAssignments: Number,
    assignments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Assignment"
      }]
})

module.exports = mongoose.model("Category",categorySchema)
