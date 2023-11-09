const express = require("express");
const { connectMongoDB } = require("./connection");
const app = express();
const PORT = 8000;
const userRouter = require("./routes/user");


// connection
connectMongoDB("mongodb://0.0.0.0:27017/users");
// Apply middleware to parse JSON requests
app.use(express.json());
app.use(userRouter);
// 
app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
});
