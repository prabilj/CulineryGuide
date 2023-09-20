const User = require('../model/userschema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.createUser = async (req, res) => {
    console.log(req.body)

    try {
        console.log("body")
        
        const { firstname, lastname, username, email, password, phone } = req.body
 
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            firstname,
            lastname,
            username,
            email,
            password: hashedPassword,
            phone
        })
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
    } catch (error){
        res.status(500).json({error: 'An error occured while creating the user.' })
    }
}

// Get a user by id
exports.getUserById = async (req,res) => {
    try {
        // console.log("insidegetuser")
        const userId = req.params.id
        const user = await User.findById(userId)
        if (user) {
            res.status(200).json(user)

        }
        else {
            res.status(400).json({ message: 'user not found'})
        }
    }
    catch (error) {
        res.status(500).json({error: "An error occured while retrieving the user." })
    }
    }

    // Get all users

    exports.getAllUsers = async (req, res) => {
        try {
            const users = await User.find()
            res.status(200).json(users)
        } 
        catch (error) {
            res.status(500).json({error: 'An error occured while reterving users.' })
        }
    }

    // update a user 

    exports.updateUserById = async (req, res) => {
        try {
            const userId = req.params.id
            const updateUser = req.body

            const result = await User.findByIdAndUpdate(userId, updateUser, { new: true })
            if (result) { 
                res.status(200).json(result)
            } else{
                res.status(400).json({ message: 'user not found. '})
            }
        } 
        catch (error) {
            res.status(500).json({ error: 'An error occcured while updating the user.' })
        }
    }

    // delete a user
    exports.deleteUSerById = async (req, res) => {
        try {
            const userId = req.params.id
            const result = await User.findByIdAndDelete(userId)
            if (result) {
                res.status(200).json({ message: 'User deleted sucessfully. '})
            }
            else {
                res.status(400).json({ message: 'User not found.'})
            }
        } catch (error) {
            res.status(500).json({ error: 'An error occured while deleting the user.' })
        }
    }

    // login
    exports.login = async (req, res) => {
        try {
            const { email, password } = req.body
            const user = await User.findOne({ email })
            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' })
            }
            const passwordMatch = await bcrypt.compare(password, user.password)

            if (!passwordMatch) {
                return res.status(401).json({ message: 'Invalid credentials'})
            }
            const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' })
            res.status(200).json({ message: 'Login sucessfully', token })
        }
        catch (error) {
            res.status(500).json({ message: 'Error during login', error: error.message})
        }
    }
    
