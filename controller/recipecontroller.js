const Recipe = require('../model/recipeschema')
const Category = require('../model/category')
const mongoose = require('mongoose');



// To create the recipe

exports.CreateRecipes = async (req, res) => {
    try {
        console.log("body",req.body)
        const newRecipe = new Recipe(req.body)
        await newRecipe.save()
        res.status(201).json({ message: 'Recipe created sucessfully'})    
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error creating recipe'})
    }
}


// To get all recipesby category

exports.getAllRecipesByCategory = async (req, res) => {
    try {
        let {category} = req.body
        console.log(category)
        const recipes = await Recipe.find({category:category})
        console.log(recipes)
        await res.status(200).json(recipes)
    }
    catch (error){
        res.status(500).json({ error: 'Error fetching recipes'})
}}



// Get all recipes

exports.getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find()
        res.status(200).json(recipes)
    }
    catch (error){
        res.status(500).json({ error: 'Error fetching recipes'})
    }}

    //  get all recipe details

    exports.getRecipesDetails = async (req, res) => {
        try {
            const recipesId = req.params.id
            const recipes = await Recipe.findById(recipesId).populate('author','username','category')
            
            if (recipes) {
                res.status(200).json({
                    code: 200,
                    status: "success",
                    message: "recipe data fetched successfully",
                    data: recipes
             })
            }
            else {
                res.status(400).json({ message: 'Recipe found'})
            }
        }
        catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Error fetching recipe'})
        }
    }

//  update recipe

    exports.updateRecipeById = async (req, res) => {
        try {
            const recipesId = req.params.id
            const updateRecipe = req.body

            const result = await Recipe.findByIdAndUpdate(recipesId, updateRecipe, { new: true });
            

            if (result){
                res.status(200).json(result);
            }
            else {
                res.status(404).json({ message: 'Recipe not found'});
            }
        }
        catch (error) {
            res.status(500).json({ error: 'An error occured while updating the recipe'});
        }
    
    }

    // delete recipe

    exports.deleteRecipeById = async (req, res) => {
        try {
            const recipesId = req.params.id
            const deleteRecipe = await Recipe.findByIdAndDelete(recipesId)

            if (deleteRecipe) {
                res.status(200).json({ message: "Recipe deleted sucessfully"})
            }
            else {
                res.status(400).json({ message: "Recipe not found"})
            }
        }
        catch (error) {
            res.status(500).json({ error: "An error occured while deleting the recipe" })
        }
    }
exports.userRecipes =  async (req,res)=>{
    console.log("inside")
    console.log(req.params)

        const userId = req.params.id
        try {
            const recipes = await Recipe.find({ userId })
            res.status(200).json(recipes)
        }
        catch (error){
            console.log(error)
            res.status(500).json({ error: 'Error fetching recipes'})
        }
    }

    


// search the recipe

    exports.search = async (request, response) => {
        try {
            const {searchTerm} = request.params; 
    
console.log(searchTerm)
            const searchResults = await Recipe.find({
                $or: [
                    { title: { $regex: searchTerm, $options: 'i' } }, // 'i' for case-insensitive search
                    { description: { $regex: searchTerm, $options: 'i' } }
                ]
            })

    
            if (searchResults.length > 0) {
                response.status(200).json(searchResults);
            } else {
                response.status(404).json({ message: 'No matching recipes found' });
            }
        } catch (error) {
            console.error('Error searching recipes:', error);
            response.status(500).json({ message: 'Error searching recipes' });
        }
    };
    

    














