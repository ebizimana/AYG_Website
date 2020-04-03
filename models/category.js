var mongoose = require('mongoose')

var categorySchema = new mongoose.Schema({
    assignments:[],
    name: String,
    weight: Number,
})

module.exports = mongoose.model("Category",categorySchema)
