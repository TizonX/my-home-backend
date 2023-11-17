const mongoose = require('mongoose');

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
            type: String,
            require: true,
        }
    })

const Home = mongoose.model("homes", homeSchema);

module.exports = Home;