const express = require('express');
const { connectMongoDB } = require('./dbConnection/dbCon');
const authRouter = require('./routers/authRoute');
const homeRouter = require('./routers/homeRoute');
const roomRouter = require('./routers/roomRouter');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5051;
// db connect
connectMongoDB(process.env.DATABASE_URL);

app.use(express.json());

// auth API
app.use("/auth", authRouter)
// home API
app.use("/api/v1/home", homeRouter)
// room API
app.use("/api/v1/room", roomRouter)

app.listen(PORT, () => console.log("Server Listening on PORT:", PORT));
