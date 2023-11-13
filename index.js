const express = require("express");
const { connectMongoDB } = require("./connection");
const path = require('path');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 8001;
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");

// connection
connectMongoDB(process.env.DATABASE_URL);
// Apply middleware to parse JSON requests
app.use(express.json());
// Set 'ejs' as the view engine
// app.set('view engine', 'ejs');
// app.set('views', path.resolve("./views"));


app.use("/auth", authRouter);
app.use('/api', userRouter);

// app.use(userRouter);
// 
app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
});
