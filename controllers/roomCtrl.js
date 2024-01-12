const express = require("express");
const Room = require("../models/roomModel");
const Home = require("../models/homeModel");
const { ObjectId } = require("mongoose").Types;
// create room
const createRoom = async (req, res) => {
  const { home_Id } = req.params;
  const { _id: owner_Id } = req.user;
  const {
    image,
    multiImage,
    flore,
    roomNo,
    roomType,
    facility,
    renter_Id = "",
  } = req.body;
  if (renter_Id) {
    renter_Id = new ObjectId(renter_Id);
  }
  try {
    const isRoomExist = await Room.findOne({ home_Id, roomNo });
    if (isRoomExist) {
      return res.status(400).json({ error: "Room No already exist" });
    }
    const isPropertyExist = await Home.findById({ _id: home_Id });
    if (isRoomExist) {
      return res.status(400).json({ error: "Property doesnt exist" });
    }
    if (isPropertyExist.noOfFlore < flore || flore < 0) {
      return res
        .status(400)
        .json({
          error: `This property has only ${isPropertyExist.noOfFlore} flore`,
        });
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
      renter_Id: renter_Id ? renter_Id : null,
    });
    await newRoom.save();
    console.log(newRoom);
    return res.status(201).json({ message: `New Room Created` });
  } catch (error) {
    console.log("create room err >>", error.message);
    return res.status(500).json({ msg: error.message });
  }
};
// Get all rooms
const getAllRooms = async (req, res) => {
  const { owner_Id, home_Id } = req.params;
  try {
    const allRooms = await Room.find({ owner_Id, home_Id });
    if (!allRooms) {
      return res.status(400).json({ error: "No room found" });
    }

    return res.status(200).json(allRooms);
  } catch (error) {
    console.log("create room err >>", error.message);
    return res.status(500).json({ msg: error.message });
  }
};
// get room by room id
const getRoomById = async (req, res) => {
  const { room_Id } = req.params;
  try {
    const room = await Room.findById({ _id: room_Id });
    if (!room) {
      return res.status(400).json({ error: "Room Not found with this Id" });
    }
    return res.status(200).json(room);
  } catch (error) {
    console.log("create room err >>", error.message);
    return res.status(500).json({ msg: error.message });
  }
};
// update room by id
const updateRoomById = async (req, res) => {
  const { room_Id } = req.params;
  const { roomNo } = req.body;
  const { _id } = req.user;
  try {
    const isRoomExist = await Room.findById({ _id: room_Id });
    if (!isRoomExist) {
      return res.status(400).json({ error: "No room found" });
    }
    if (isRoomExist.owner_Id !== _id) {
      return res.status(400).json({ error: "This Room Doesnt belongs to you" });
    }
    if (isRoomExist.roomNo !== roomNo) {
      const isSameRoomNoExist = await Room.findOne({ roomNo });
      if (isSameRoomNoExist) {
        return res.status(400).json({ error: "This Room No Already Exists" });
      }
    }
    Object.assign(isRoomExist, req.body);
    const newRoom = await isRoomExist.save();
    return res.status(201).json(newRoom);
  } catch (error) {
    console.log("update room err >>", error.message);
    return res.status(500).json({ msg: error.message });
  }
};
// delete room by id
const deleteRoomById = async (req, res) => {
  const { room_Id } = req.params;
  const { _id } = req.user;
  try {
    const isPropertyExist = await Room.findById({ _id: room_Id });
    if (!isPropertyExist) {
      return res.status(400).json({ error: "No room found with this Id" });
    }
    if (isPropertyExist.owner_Id !== _id) {
      return res.status(400).json({ error: "This Room Doesnt Belongs to you" });
    }
    await Room.findByIdAndDelete({ _id: room_Id });
    return res.status(200).json({ message: "Room Deleted Successfully" });
  } catch (error) {
    console.log("delete room err >>", error.message);
    return res.status(500).json({ msg: error.message });
  }
};
module.exports = {
  createRoom,
  getAllRooms,
  getRoomById,
  updateRoomById,
  deleteRoomById,
};
