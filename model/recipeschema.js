const mongoose = require('mongoose')

const recipeschema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
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
    category: {
        type: mongoose.Schema.Types.ObjectId,   
        ref: 'Category',
        required: true
    } ,
    difficulty: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,   
        ref: 'users'
    } 
},
{
    timestamps: true
 })

const Recipe = mongoose.model('Recipe', recipeschema)
module.exports = Recipe