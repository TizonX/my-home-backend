const express = require('express');
const Auth = require('../models/authModel');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JwtTokenGenerator } = require('../service/JwtTokenGenerate');

// sign up owner
const handleSignUp = async (req, res) => {
    try {
        const { firstName, lastName, email, phone, password } = req.body;
        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        const isUserExist = await Auth.findOne({ email, phone });
        if (isUserExist) {
            return res.status(400).json({ error: 'User already exists' });
        }
        // password encoded
        const hashedPassword = await bcrypt.hash(password, 10);
        // registering new user
        const newUser = new Auth({
            firstName,
            lastName,
            email,
            phone,
            password: hashedPassword,
            role: "owner",
        });

        await newUser.save();
        res.json({ message: 'User registered successfully' });
    } catch (error) {
        console.log("signup err >>", error.message);
        return res.status(400).json({ msg: error.message });
    }
}

// sign up renter
const handleSignUpRenter = async (req, res) => {
    try {
        const { firstName, lastName, email, phone, password } = req.body;
        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        const isUserExist = await Auth.findOne({ email, phone });
        if (isUserExist) {
            return res.status(400).json({ error: 'User already exists' });
        }
        // password encoded
        const hashedPassword = await bcrypt.hash(password, 10);
        // registering new user
        const newUser = new Auth({
            firstName,
            lastName,
            email,
            phone,
            password: hashedPassword,
            role: "renter",
        });

        await newUser.save();
        res.json({ message: 'User registered successfully' });
    } catch (error) {
        console.log("signup err >>", error.message);
        return res.status(400).json({ msg: error.message });
    }
}


// sing in
const handleSignIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        const isUserExist = await Auth.findOne({ email });
        if (!isUserExist) {
            return res.status(401).json({ error: 'Email/Phone Invalid' });
        }
        // Compare the provided password with the hashed password in the database
        const passwordMatch = bcrypt.compare(password, isUserExist.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid Password' });
        }

        const token = JwtTokenGenerator({ _id: isUserExist._id, email: isUserExist.email, role: isUserExist.role });

        return res.status(200).json({
            token,
            _id: isUserExist._id,
            firstName: isUserExist.firstName,
            lastName: isUserExist.lastName,
            email: isUserExist.email,
            role: isUserExist.role,
        })
    } catch (error) {
        console.log("sigin error >>", error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}
// sing in renter
const handleSignInRenter = async (req, res) => {
    try {
        const { email, password } = req.body;

        const isUserExist = await Auth.findOne({ email });
        if (!isUserExist) {
            return res.status(401).json({ error: 'Email/Phone Invalid' });
        }
        // Compare the provided password with the hashed password in the database
        const passwordMatch = bcrypt.compare(password, isUserExist.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid Password' });
        }

        const token = JwtTokenGenerator({ _id: isUserExist._id, email: isUserExist.email, role: isUserExist.role });

        return res.status(200).json({
            token,
            _id: isUserExist._id,
            firstName: isUserExist.firstName,
            lastName: isUserExist.lastName,
            email: isUserExist.email,
            role: isUserExist.role,
        })
    } catch (error) {
        console.log("sigin error >>", error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}


module.exports = {
    handleSignUp,
    handleSignUpRenter,
    handleSignIn,
    handleSignInRenter,
};