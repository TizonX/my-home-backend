const mongoose = require('mongoose');

// auth schema

const authSchema = new mongoose.Schema
    ({
        firstName:
        {
            type: String,
            require: true,
        },
        lastName:
        {
            type: String,
            require: true,
        }
        ,
        email:
        {
            type: String,
            require: true,
            unique: true,
        },
        phone:
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
        role:
        {
            type: String,
            require: true,
        }
    });

const Auth = mongoose.model("users", authSchema);

module.exports = Auth;