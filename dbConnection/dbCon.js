const mongoose = require('mongoose');

const connectMongoDB = async(url)=>
{
    return mongoose.connect(url).then(() => console.log("Mongo Connected...")).catch((err) => console.log("mongo Error: ", err))
}

module.exports = {
    connectMongoDB,
}