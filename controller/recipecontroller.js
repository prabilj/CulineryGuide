const Recipe = require('../model/recipeschema')


exports.CreateRecipes = async (req, res) => {
    try {
        const newRecipe = new Recipe(req.body)
        await newRecipe.save()
        res.status(201).json({ message: 'Recipe created sucessfully'})    
    }
    catch (error) {
        res.status(500).json({ error: 'Error creating recipe'})
    }
}

exports.getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find()
        res.status(200).json(recipes)
    }
    catch (error){
        res.status(500).json({ error: 'Error fetching recipes'})
    }}

    exports.getRecipesDetails = async (req, res) => {
        try {
            const recipesId = req.params.id
            const recipes = await Recipe.findById(recipesId).populate('author','username')
            
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


    exports.updateRecipeById = async (req, res) => {
        try {
            const recipesId = req.params.id
            const updateRecipe = req.body
            const result = await Recipe.findByIdAndUpdate(recipesId, updateRecipe, { new: true })

            if (result){
                res.status(200).json(result) 
            }
            else {
                res.status(404).json({ message: 'Recipe not found'})
            }
        }
        catch (error) {
            res.status(500).json({ error: 'An error occured while updating the recipe'})
        }
    
    }

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

    