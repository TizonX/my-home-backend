const express = require('express');
const Home = require('../models/homeModel');


// create home
const createHome = async (req, res) => {
    try {
        const { bannerImage, multiImage, propertyName, houseNo, address, noOfFlore, createdDate } = req.body;
        if (!houseNo) {
            return res.status(400).json({ error: 'House No is Required!!!' });
        }
        const isPropertyExist = await Home.findOne({ houseNo });
        if (isPropertyExist) {
            return res.status(400).json({ error: 'Property Already Exists' });
        }
        const newHome = new Home({
            bannerImage,
            multiImage,
            propertyName,
            houseNo,
            address,
            noOfFlore,
            createdDate,
        })
        await newHome.save();
        res.json({ message: "Property save successfully!!!" });

    } catch (error) {
        console.log("create home err >>", error.message);
        return res.status(500).json({ msg: error.message });
    }
}
// getHomeById
const getHomeById = async (req, res) => {
    try {
        const { _id } = req.params;
        if (!_id) {
            return res.status(400).json({ error: "Property id is missing" });
        }
        const isPropertyExist = await Home.findById({ _id });
        if (!isPropertyExist) {
            return res.status(400).json({ error: 'No Property Found with this _id' });
        }
        return res.status(200).json(isPropertyExist);
    } catch (error) {
        console.log("get property by id err >>", error.message);
        return res.status(500).json({ msg: error.message });
    }
}

module.exports = {
    createHome,
    getHomeById
}