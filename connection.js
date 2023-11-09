const mongoose = require('mongoose');

async function connectMongoDB(url)
{
    
    // connect data-base
    return mongoose.connect(url).then(() => console.log("Mongo Connected...")).catch((err) => console.log("mongo Error: ", err))
}
module.exports = {
    connectMongoDB,
};