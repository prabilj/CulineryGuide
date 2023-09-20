const express = require('express')
const bodyparser = require('body-parser')
// const crypto = require('crypto')
//  const nodemailer= require('nodemailer')
const app = express()
const port = 3000
app.use(express.json())
app.use(bodyparser.json())


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
//const updatePassword = require('./controller/password')
// app.use(bodyparser.json())

// define user related rourtes

app.post('/registration',user.createUser)
app.get('/getuser/:id',user.getUserById)
app.get('/alluser',user.getAllUsers)
app.put('/updateuser',user.updateUserById)
app.delete('/deleteuser/:id',user.deleteUSerById)
app.post('/loginuser',user.login)
app.post('/forgotpassword',Password.forgotPasswordHandler)
app.post('/updatepassword',Password.updatePassword)

// define recipe related routes
app.post('/create',recipe.CreateRecipes)
app.get('/allrecipe',recipe.getAllRecipes)
app.get('/getrecipe/:id',recipe.getRecipesDetails)
app.put('/updaterecipe/:id',recipe.updateRecipeById)
app.delete('/deleterecipe/:id',recipe.deleteRecipeById)

// define file upload routes
app.post('/fileupload',upload.single('file'),fileupload.fileupload)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

