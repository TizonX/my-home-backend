const express = require("express");
const Blog = require("../models/blog");

// create user
const createUser = async (req, res) => {
    try {
        const { title, description, postType } = req.body;
        // const body = req.body;
        if (!title || !description || !postType) {
            return res.status(400).json({ msg: "All fields are require !!!" });
        }
        const result = await Blog.create({
            title,
            description,
            postType,
        });
        return res.status(201).json({ msg: "success" });
    } catch (error) {
        console.log("create post err>> ", error.message);
    }
}
// get all user

const getAllUsers = async (req, res) => {
    try {
        const users = await Blog.find({});
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
        const user = await Blog.findOne({ _id })
        if (user) {
            res.json(user);
        }
        else {
            return res.status(404).json({ msg: "Blog not found" });
        }
    } catch (error) {
        console.log("Get Blog Error >>", error);
        return res.status(404).json({ msg: error.message });
    }

}

// update user
const updateUserById = async (req, res) => {
    const { _id } = req.params;
    try {
        const user = await Blog.findById({ _id });
        if (!user) {
            return res.status(404).json({ msg: 'Blog not found' });
        }
        Object.assign(user, req.body);
        const updatedUser = await user.save();
        res.json(updatedUser);

    } catch (error) {
        console.log("Patch Blog Error >>", error);
        return res.status(404).json({ msg: error.message });
    }
}

// delete user
const deleteUserById = async (req, res) => {
    const { _id } = req.params;
    try {
        const deletedUser = await Blog.findByIdAndDelete({ _id });
        if (deletedUser) {
            res.json({ msg: 'Blog deleted successfully' });
        } else {
            res.status(404).json({ msg: 'Blog not found' });
        }
    } catch (error) {
        console.log("Delete Blog Error >>", error);
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