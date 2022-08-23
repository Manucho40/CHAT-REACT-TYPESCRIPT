const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        pseudo: {
            type: String,
            required: [true, 'Please add a text name'],
            unique: true
        },
        email: {
            type: String,
            required: [true, 'Please add a email'],
            unique: true
        },
        password: {
            type: String,
            required: [true, 'Please add a password']
        },
        token: {
            type: String,
            // required: [true, 'Please add a text token']
        },
    
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('User', userSchema)