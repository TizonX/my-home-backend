const mongoose = require('mongoose');

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
            type: String,
            require: true,
        },
        home_Id:
        {
            type: String,
            require: true,
        },
        renter_Id:
        {
            type:String,
        }

    })

const Room = mongoose.model('rooms', roomSchema);
module.exports = Room;