const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
// const crypto = require('crypto')
//  const nodemailer= require('nodemailer')
const app = express()
const port = 3000
app.use(express.json())
app.use(bodyparser.json())


app.use(cors())
const multer = require('multer')
const storage = multer.memoryStorage();
const upload = multer({storage: storage})

// import database connection and controllers

const db = require('./DB/database')
const user = require('./controller/usercontroller')
const User = require('./model/userschema')
const recipe = require('./controller/recipecontroller')
const Recipe = require('./model/recipeschema')
const Password = require('./controller/password')
const fileupload = require('./controller/fileupload')
const category = require('./controller/category')
// const searchbar = require('./controller/searchbar')

//const updatePassword = require('./controller/password')
// app.use(bodyparser.json())

// define user related rourtes

app.post('/Users',user.createUser)
app.get('/Users/:id',user.getUserById)
app.get('/Users',user.getAllUsers)
app.put('/Users',user.updateUserById)
app.delete('/Users/:id',user.deleteUSerById)
app.post('/Tokens',user.signin)
app.post('/forgotpassword',Password.forgotPasswordHandler)
app.post('/updatepassword',Password.updatePassword)
app.put('/updateProfile/:_id',user.updateProfile)

// define recipe related routes

app.post('/Recipes',recipe.CreateRecipes)
app.post('/Recipes/category',recipe.getAllRecipesByCategory)
app.get('/Allrecipe',recipe.getAllRecipes)
app.get('/Recipes/:id',recipe.getRecipesDetails)
app.put('/Recipes/:id',recipe.updateRecipeById)
app.delete('/Recipes/:id',recipe.deleteRecipeById)
// app.get('/users/Recipes/:id',recipe.userRecipes)
app.get('/userRecipes/:id',recipe.userRecipes)

// define file upload routes
app.post('/fileupload',upload.single('file'),fileupload.fileupload)
app.get('/category',category.GetAllRecipeCategories)
app.post('/category',category.CreateRecipesCategory)
// app.get('/search/:categoryOrtitle',recipe.search)
app.get('/search/:searchTerm', recipe.search);


 

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

