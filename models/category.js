var mongoose = require('mongoose')

var categorySchema = new mongoose.Schema({
    name: String,
    weight: Number
})

module.exports = mongoose.model("Category",categorySchema)
