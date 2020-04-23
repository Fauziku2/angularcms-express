const mongoose = require('mongoose');

// User Schema
const UserSchema = mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String
    }
});

const User = module.exports = mongoose.model("User", UserSchema);
