const mongoose= require ('mongoose');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
        max: 20
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        max: 20
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    resetToken: {
        type: String,
    },
    resetTokenExpiration: {
        type: Date,
    }
},{
    timestamps:true
});

const User = mongoose.model('users', userSchema);

module.exports=User;