const mongoose = require('mongoose')

const recipeschema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    ingredients: [{
        name: String,
        quantity: String
    }],
    instructions: {
        type: String,
        required: true
    },
    cookingTime: {
        type: Number,
        required: true
    },
    serving: {
        type: Number,
        required: true
    },
    imageUrl: String,
    categories: [String],
    difficulty: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,   
        ref: 'user'
    } 
},
{
    timestamps: true
 })

const Recipe = mongoose.model('Recipe', recipeschema)
module.exports = Recipe