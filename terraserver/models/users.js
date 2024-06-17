const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    aadhar: {
        type: String, 
        required: true, 
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    landIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Land'
    }],
    dp: {
        type: String,
    }
});

const userModel = mongoose.model("users", UserSchema)

module.exports = userModel