const Category = require('../model/category')

exports.CreateRecipesCategory= async (req, res) => {
    try {
        const newCategory = new Category(req.body)
        await newCategory.save()
        res.status(201).json({ message: 'Category created sucessfully'})    
    }
    catch (error) {
        res.status(500).json({ error: 'Error creating Category'})
    }
}

exports.GetAllRecipeCategories= async (req, res) => {
    try {
        let categoryList = await Category.find({})
        console.log("category",categoryList)
        res.status(201).json({ message: 'Category fetched sucessfully',data: categoryList})    
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching Category'})
    }
}
