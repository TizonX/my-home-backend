const express = require('express');
const {connectMongoDB} = require('./dbConnection/dbCon');
const authRouter = require('./routers/authRoute');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5051;
// db connect
connectMongoDB(process.env.DATABASE_URL);

app.use(express.json());

// auth API
app.use("/auth", authRouter)

app.listen(PORT, ()=>console.log("Server Listening on PORT:", PORT));
