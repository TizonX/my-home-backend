const express = require("express");
const mongoose = require('mongoose');
const app = express();
const PORT = 8000;

// connect data-base
mongoose.connect("mongodb://0.0.0.0:27017/users").then(() => console.log("Mongo Connected...")).catch((err) => console.log("mongo Error: ", err))

const enums = {
    type: String,
    required: true,
    unique: true,
}
// schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    email: {
        enums
    },
    jobTitle: {
        type: String,
    },
    gender: {
        type: String,
    }
});

const User = mongoose.model("user", userSchema);

//
app.use(express.json());
// 
app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
});
// routes
app.get("/api/users", async (req, res) => {
    const body = req.body;
    if (!body || !body.firstName || !body.lastName || !body.email || !body.gender || !body.jobTitle) {

        return res.status(400).json({ msg: "All fields are require !!!" });
    }
    const result = await User.create({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        gender: body.gender,
        jobTitle: body.jobTitle,
    });
    console.log("result :", result);
    return res.status(201).json({msg:"success"});

})