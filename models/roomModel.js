const mongoose = require('mongoose');
const Auth = require('./authModel');
const Home = require('./homeModel');

// room schema
const roomSchema = new mongoose.Schema
    ({
        image:
        {
            type: String,
        },
        multiImage:
        {
            type: Array,
            default: [],
        },
        flore:
        {
            type: Number,
            require: true,
        },
        roomNo:
        {
            type: String,
            require: true,
        },
        roomType: {
            type: String,
            require: true,
        },
        facility:
        {
            type: Array,
            default: [],
        },
        owner_Id:
        {
            type:  mongoose.Schema.Types.ObjectId,
            ref: Auth,
            require: true,
        },
        home_Id:
        {
            type:  mongoose.Schema.Types.ObjectId,
            ref: Home,
            require: true,
        },
        renter_Id:
        {
            type: mongoose.Schema.Types.ObjectId,
        }

    })

const Room = mongoose.model('rooms', roomSchema);
module.exports = Room;