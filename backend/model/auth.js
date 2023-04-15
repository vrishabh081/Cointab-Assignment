const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// schema-
const userSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    },
    loginAttempts: {
        type: Number,
        default: 0
    },
    lastLoginAttemptAt: {
        type: Date,
        default: null
    },
    blockedUntil: {
        type: Date, 
        default: null
    }
});

// model-
const UserModel = mongoose.model("user", userSchema)

module.exports = UserModel