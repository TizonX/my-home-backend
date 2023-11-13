const mongoose = require('mongoose');

// auth schema
const authSchema = new mongoose.Schema
    ({
        email:
        {
            type: String,
            require: true,
            unique: true,
        },
        password:
        {
            type: String,
            require: true,
        },
        role
        :
        {
            type: String,
            require: true,
        }

    });


const Auth = mongoose.model("auth", authSchema);

module.exports = Auth;