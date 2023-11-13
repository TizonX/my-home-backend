const express = require("express");
const Auth = require('../models/auth');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateJwtToken, verifyJwtToken } = require("../services/generateJwtToken");

// sign up
const handleSignup = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }
        const existingUser = await Auth.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create a new user
        const newUser = new Auth({ email, password: hashedPassword, role });
        await newUser.save();


        res.json({ message: 'User registered successfully' });

    } catch (error) {
        console.log("signup err >>", error.message);
        return res.status(400).json({ msg: error.message });
    }
}

// sign in
const handleSignin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }
        const UserData = await Auth.findOne({ email });
        if (!UserData) {
            return res.status(401).json({ error: 'Invalid credentials 1' });
        }
        // Compare the provided password with the hashed password in the database
        const passwordMatch = bcrypt.compare(password, UserData.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials 2' });
        }
        // Generate and send a JWT
        const token = generateJwtToken(UserData._id, { email: UserData.email,role: UserData.role })

        return res.status(200).json({
            token: token,
            _id: UserData._id,
            email: UserData.email,
            role: UserData.role,
        });

    } catch (error) {
        console.log("sigin error >>", error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


// get user info with valid token
const userInfo = async (req, res) => {
    const { _id } = req.params;
    try {
        const authorization = req.headers['authorization'];
        const token = authorization.split("Bearer ")[1];
        if (!token) {
            return res.status(500).json({ msg: "UnAuthorized" });
        }
        const isTokenValid = verifyJwtToken(token);
        if (isTokenValid) {
            const user = await Auth.findOne({ _id });
            return res.status(200).json(user);
        }
        else {
            return res.status(500).json({ msg: "token expired" });
        }
    } catch (error) {
        console.log("user Info error >>", error.message);
        return res.status(500).json({ msg: "somthing wents wrong" });
    }

}


module.exports = {
    handleSignup,
    handleSignin,
    userInfo
};
