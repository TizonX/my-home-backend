const express = require('express');
const Room = require('../models/roomModel');
const Home = require('../models/homeModel');
// create room
const createRoom = async (req, res) => {
    const { owner_Id, home_Id } = req.params;
    const { image, multiImage, flore, roomNo, roomType, facility, renter_Id = "" } = req.body;
    try {
        const isRoomExist = await Room.findOne({ home_Id, roomNo });
        if (isRoomExist) {
            return res.status(400).json({ error: 'Room No already exist' });
        }
        const isPropertyExist = await Home.findById({ _id: home_Id });
        if (isRoomExist) {
            return res.status(400).json({ error: 'Property doesnt exist' });
        }
        if (isPropertyExist.noOfFlore < flore || flore < 0) {
            return res.status(400).json({ error: `This property has only ${isPropertyExist.noOfFlore} flore` });
        }
        const newRoom = new Room({
            image,
            multiImage,
            flore,
            roomNo,
            roomType,
            facility,
            owner_Id,
            home_Id,
            renter_Id: renter_Id
        });
        await newRoom.save();
        return res.status(201).json({ message: `New Room Created` });
    } catch (error) {
        console.log("create room err >>", error.message);
        return res.status(500).json({ msg: error.message });
    }
}
// Get all rooms
const getAllRooms = async (req, res) => {
    const { owner_Id, home_Id } = req.params;
    try {
        const allRooms = await Room.find({ owner_Id, home_Id });
        if (!allRooms) {
            return res.status(400).json({ error: 'No room found' });
        }

        return res.status(200).json(allRooms);
    } catch (error) {
        console.log("create room err >>", error.message);
        return res.status(500).json({ msg: error.message });
    }
}
// get room by room id
const getRoomById = async (req, res) => {
    const { room_Id } = req.params;
    try {
        const room = await Room.findById({ _id: room_Id });
        if (!room) {
            return res.status(400).json({ error: 'Room Not found with this Id' });
        }
        return res.status(200).json(room);
    } catch (error) {
        console.log("create room err >>", error.message);
        return res.status(500).json({ msg: error.message });
    }
}
// update room by id
const updateRoomById = async (req, res) => {
    const { room_Id } = req.params;
    const { roomNo } = req.body;
    const { _id } = req.user;
    try {
        const isRoomExist = await Room.findById({ _id: room_Id });
        if (!isRoomExist) {
            return res.status(400).json({ error: 'No room found' });
        }
        if (isRoomExist.owner_Id !== _id) {
            return res.status(400).json({ error: 'This Room Doesnt belongs to you' });
        }
        if (isRoomExist.roomNo !== roomNo) {
            const isSameRoomNoExist = await Room.findOne({ roomNo });
            if (isSameRoomNoExist) {
                return res.status(400).json({ error: 'This Room No Already Exists' });
            }
        }
        Object.assign(isRoomExist, req.body);
        const newRoom = await isRoomExist.save();
        return res.status(201).json(newRoom);
    } catch (error) {
        console.log("create room err >>", error.message);
        return res.status(500).json({ msg: error.message });
    }
}
module.exports = {
    createRoom,
    getAllRooms,
    getRoomById,
    updateRoomById,

}