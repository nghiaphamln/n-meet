const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let userModelSchema = new Schema({
    googleId: Number,
    googleToken: String,
    fullName: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    permission: {
        type: Number,
        default: 0
    },
    avatar: {
        type: String,
        default: '/images/no-avatar.png'
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('users', userModelSchema);