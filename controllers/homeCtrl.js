const express = require("express");
const Home = require("../models/homeModel");
const Auth = require("../models/authModel");
const { ObjectId } = require("mongoose").Types;

// create home
const createHome = async (req, res) => {
  try {
    const {
      bannerImage,
      multiImage,
      propertyName,
      houseNo,
      address,
      noOfFlore,
      createdDate,
      owner_Id,
    } = req.body;
    let singleImagePath = "";
    if (req.files["upload"][0]) {
      const { filename, path } = req.files["upload"][0];
      singleImagePath = path;
    }

    const multipleimages = [];
    req.files["uploadMultiple"]?.map((data) => {
      multipleimages.push(`http://localhost:${process.env.PORT}/` + data.path);
    });

    if (!houseNo) {
      return res.status(400).json({ error: "House No is Required!!!" });
    }
    const isPropertyExist = await Home.findOne({ houseNo });
    if (isPropertyExist) {
      return res.status(400).json({ error: "Property Already Exists" });
    }
    const newHome = new Home({
      bannerImage: `http://localhost:${process.env.PORT}/` + singleImagePath,
      multiImage: multipleimages,
      propertyName,
      houseNo,
      address,
      noOfFlore,
      createdDate,
      owner_Id,
    });
    const home_obj = await newHome.save();
    res.json({
      message: "Property save successfully!!!",
      _id: home_obj._id,
    });
  } catch (error) {
    console.log("create home err >>", error.message);
    return res.status(500).json({ msg: error.message });
  }
};
// get all home data
// const getAllHome = async (req, res) => {
//     const { owner_Id } = req.params;
//     try {
//         const allHomeData = await Home.find({ owner_Id });
//         if (!allHomeData) {
//             return res.status(400).json({ error: 'Somthing wents wrong' });
//         }
//         return res.status(200).json(allHomeData);
//     } catch (error) {
//         console.log("all home err >>", error.message);
//         return res.status(500).json({ msg: error.message });
//     }
// }

const getAllHome = async (req, res) => {
  const { owner_Id } = req.params;
  const userId = new ObjectId(owner_Id);
  try {
    const allHomeData = await Auth.aggregate([
      {
        $match: {
          _id: userId,
        },
      },
      {
        $lookup: {
          from: "homes",
          let: { userId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$$userId", { $toObjectId: "$owner_Id" }],
                },
              },
            },
            {
              $lookup: {
                from: "rooms",
                let: { homeId: "$_id" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $eq: ["$$homeId", { $toObjectId: "$home_Id" }],
                      },
                    },
                  },
                ],
                as: "rooms",
              },
            },
          ],
          as: "homes",
        },
      },
      {
        $project: {
          password: 0, // Exclude the password field
        },
      },
    ]);

    if (!allHomeData) {
      return res.status(400).json({ error: "Somthing wents wrong" });
    }
    return res.status(200).json(allHomeData);
  } catch (error) {
    console.log("all home err >>", error.message);
    return res.status(500).json({ msg: error.message });
  }
};

// getHomeById
const getHomeById = async (req, res) => {
  try {
    const { owner_Id, home_Id } = req.params;
    if (!home_Id) {
      return res.status(400).json({ error: "Property id is missing" });
    }
    const isPropertyExist = await Home.findOne({ _id: home_Id });
    if (!isPropertyExist) {
      return res.status(400).json({ error: "No Property Found with this _id" });
    }
    if (isPropertyExist.owner_Id !== owner_Id) {
      return res
        .status(400)
        .json({ error: "This Home doesnt belongs to you " });
    }
    return res.status(200).json(isPropertyExist);
  } catch (error) {
    console.log("get property by id err >>", error.message);
    return res.status(500).json({ msg: error.message });
  }
};
// update home by id
const updateHomeById = async (req, res) => {
  const { owner_Id, home_Id } = req.params;
  const { houseNo } = req.body;
  try {
    const isHomeNoAlreadyPresent = await Home.findOne({ houseNo });
    if (isHomeNoAlreadyPresent) {
      return res.status(400).json({ error: "House Number Should be unique" });
    }
    const isPropertyExist = await Home.findById({ _id: home_Id });
    if (!isPropertyExist) {
      return res.status(400).json({ error: "No Property Found with this _id" });
    }
    if (!isPropertyExist.owner_Id.equals(new ObjectId(owner_Id))) {
      return res
        .status(400)
        .json({ error: "This Home doesnt belongs to you " });
    }
    Object.assign(isPropertyExist, req.body);
    const updatedHome = await isPropertyExist.save();
    return res.status(200).json(updatedHome);
  } catch (error) {
    console.log("update home by id err >>", error.message);
    return res.status(500).json({ msg: error.message });
  }
};
// delete home by id
const deleteHomeById = async (req, res) => {
  const { owner_Id, home_Id } = req.params;
  try {
    const isPropertyExist = await Home.findOne({ _id: home_Id });
    if (!isPropertyExist) {
      return res
        .status(400)
        .json({ message: "Property Not Found with this id" });
    }
    if (isPropertyExist.owner_Id !== owner_Id) {
      return res
        .status(400)
        .json({ message: "This property doesnt belongs to you" });
    }
    await Home.findByIdAndDelete({ _id: home_Id });
    return res.status(200).json({ message: "property deleted" });
  } catch (error) {
    onsole.log("update home by id err >>", error.message);
    return res.status(500).json({ msg: error.message });
  }
};
module.exports = {
  createHome,
  getAllHome,
  getHomeById,
  updateHomeById,
  deleteHomeById,
};
