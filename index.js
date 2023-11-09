const express = require("express");
const mongoose = require('mongoose');
const app = express();
const PORT = 8000;
const route = express.Router();
// connect data-base
mongoose.connect("mongodb://0.0.0.0:27017/users").then(() => console.log("Mongo Connected...")).catch((err) => console.log("mongo Error: ", err))

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
        type: String,
        required: true,
        unique: true,
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
app.post("/api/users", async (req, res) => {
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
    return res.status(201).json({ msg: "success" });
})
app.route("/api/user/:_id").get(async (req, res) => {
    const { _id } = req.params;
    try {
        const user = await User.findOne({ _id })
        if (user) {
            res.json(user);
        }
        else {
            res.status(404).json({ msg: "User not found" });
        }
    } catch (error) {
        console.log("Get User Error >>", error);
    }

}).patch(async (req, res) => {
    const { _id } = req.params;
    try {
        const user = await User.findById({ _id });
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        Object.assign(user, req.body);
        const updatedUser = await user.save();
        res.json(updatedUser);

    } catch (error) {
        console.log("Patch User Error >>", error);
        return res.status(404).json({ msg: error.message });
    }
}).delete(async (req, res) => {
    const { _id } = req.params;
    try {
        const deletedUser = await User.findByIdAndDelete({ _id });
        if (deletedUser) {
            res.json({ msg: 'User deleted successfully' });
        } else {
            res.status(404).json({ msg: 'User not found' });
        }
    } catch (error) {
        console.log("Delete User Error >>", error);
        return res.status(404).json({ msg: error.message });
    }
})