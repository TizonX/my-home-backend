const mongoose = require('mongoose');
const Auth = require('./authModel');

// home schema
const homeSchema = new mongoose.Schema
    ({
        bannerImage:
        {
            type: String,
        },
        multiImage:
        {
            type: Array,
            default: [],
        },
        propertyName:
        {
            type: String,
            require: true,
        },
        houseNo:
        {
            type: String,
            require: true,
        }
        ,
        address:
        {
            type: String,

        },
        noOfFlore: {
            type: Number,
            require: true,
        },
        createdDate:
        {
            type: Date,
            default: Date.now,
            require: true,
        },
        owner_Id:
        {
            type:  mongoose.Schema.Types.ObjectId,
            ref: Auth,
            require: true,
        }
    })

const Home = mongoose.model("homes", homeSchema);

module.exports = Home;