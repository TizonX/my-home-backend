const express = require("express");
const User = require("../models/user");

// create user
const createUser = async (req, res) => {
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
}
// get all user

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        if (users) {
            res.json(users);
        }
        else {
            return res.status(500).json({ msg: "Somthing wents wrong" });
        }
    } catch (error) {
        console.log("get all user error >>", error.message);
        return res.status(500).json({ msg: error.message });

    }
}
// get user by id
const getUserById = async (req, res) => {
    const { _id } = req.params;
    try {
        const user = await User.findOne({ _id })
        if (user) {
            res.json(user);
        }
        else {
            return res.status(404).json({ msg: "User not found" });
        }
    } catch (error) {
        console.log("Get User Error >>", error);
        return res.status(404).json({ msg: error.message });
    }

}

// update user
const updateUserById = async (req, res) => {
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
}

// delete user
const deleteUserById = async (req, res) => {
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
}

module.exports = {
    getAllUsers,
    createUser,
    getUserById,
    updateUserById,
    deleteUserById
}