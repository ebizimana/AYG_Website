 var mongoose = require('mongoose')

var categorySchema = new mongoose.Schema({
    assignments: {
        name: [String],
        totalPoints: Number,
        totalNumber: Number,
        numberAssignmentNotGraded: Number,
        sumActualScore: Number
    },
    name: String,
    weight: Number,
})

module.exports = mongoose.model("Category", categorySchema)