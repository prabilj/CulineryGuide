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
        res.status(201).json({
            code:200,
            status:"success",
            message: 'user created sucessfully',
            data: savedUser
        })
    } catch (error){
        console.log(error)
        res.status(500).json({
            code:400,
            status:"error",
            message: 'An error occured while creating the user.'
        })
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
    exports.signin = async (req, res) => {
        try {
            //console.log("inside signin")
            const { email, password } = req.body
            console.log(req.body)
            
            const user = await User.findOne({ email })
            console.log("user",user)
            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' })
            }
            const passwordMatch = await bcrypt.compare(password, user.password)

            if (!passwordMatch) {
                return res.status(401).json({ message: 'Password didnot match'})
            }
            const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' })
            res.status(200).json({ message: 'Login sucessfully', token,data:{
                    name : user.firstname,
                    userId :user._id
            }
             })
            console.log("token",token)
        }
        catch (error) {
            res.status(500).json({ message: 'Error during login', error: error.message})
        }
    }
    


    // Update user's profile
    exports.updateProfile = async (req, res) => {
      try {
        const userId = req.params._id; // Assuming you're using JWT for authentication
         const updateData = req.body;
        if (!userId) {
            return res.status(401).json({ message: 'User not authenticated'})
        }
    
        // Find the user in the database by userId
        const user = await User.findById(userId);
    
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        // If new password is provided, hash and update it
        if (updateData.password) {
          const newPassword = await bcrypt.hash(updateData.password, 10);
          user.password = newPassword;
        }
    
        // Update other profile data (firstname, lastname, username, email, phone, etc.)
        user.firstname = updateData.firstname || user.firstname;
        user.lastname = updateData.lastname || user.lastname;
        user.username = updateData.username || user.username;
        user.email = updateData.email || user.email;
        user.phone = updateData.phone || user.phone;
    
        const updatedUser = await user.save();
    
        res.status(200).json({
          message: 'Profile updated successfully',
          data: updatedUser,
        });
      } catch (error) {
        console.log(error)
        res.status(500).json({
          code: 400,
          status: 'error',
          message: 'An error occurred while updating the user profile.',
          error: error.message,
        });
      }
    };
    