import { collections } from "../../client/src/assets/assets.js";
import collectionModel from "../models/collectionModel.js";
import userModel from "../models/userModel.js";
import mongoose from "mongoose";

// Get user's collections
const getCollectionIds = async (req, res) => {
  try {
    const { userId } = req.body;

    // Validate required fields
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User id required" });
    }

    // Get collections for this user
    const user = await userModel.findById(userId).select("collections");
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    res.json({ success: true, data: user.collections });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error: " + error.message,
    });
  }
};

// Add collection
const addCollection = async (req, res) => {
  try {
    // Get collection name
    const { name, userId } = req.body;

    // Validate required fields
    if (!name || !userId) {
      return res.status(400).json({
        success: false,
        message: "New collection name and userId required",
      });
    }

    // Validate name isn't empty after trimming
    if (name.trim().length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Collection name cannot be empty" });
    }

    // Check if user exists
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found. Failed to add collection to user",
      });
    }

    // Check if collection with same name exists for this user
    const exists = await collectionModel.findOne({ userId, name: name.trim() });
    if (exists) {
      return res.status(409).json({
        success: false,
        message: "A collection with this name already exists",
      });
    }

    // Use transaction to ensure both operations success or fail
    const session = await mongoose.startSession();

    try {
      await session.withTransaction(async () => {
        // Create new collection and add to db
        const newCollection = new collectionModel({
          name,
          userId,
          obtainedItems: new Map(),
        });
        const savedCollection = await newCollection.save({ session });

        // Add collection reference to user's collection array
        await userModel.findByIdAndUpdate(
          userId,
          { $addToSet: { collections: savedCollection._id } },
          { session }
        );

        // Store collection for response
        req.newCollection = savedCollection;
      });

      await session.endSession();

      res
        .status(201)
        .json({ success: true, message: "Collection added successfully" });
    } catch (transactionError) {
      await session.endSession();
      console.log(transactionError);
      res.status(400).json({
        success: false,
        message: "Error adding collection: " + transactionError,
      });
    }

    res.json({ success: true, message: "Collection added" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error: " + error.message,
    });
  }
};

// Rename collection
const renameCollection = async (req, res) => {
  try {
    // Get the collection's id, the new name, and user's id
    const { _id, name, userId } = req.body;

    // Validate required fields
    if (!_id || !name || !userId) {
      return res.status(400).json({
        success: false,
        message: "Collection id and new collection name required",
      });
    }

    // Check if another collection under the same user exists
    const existingCollection = await collectionModel.findOne({
      name: name.trim(),
      userId,
      _id: { $ne: _id }, // ensures collection id checks all ids besides its own (ne = not equal to)
    });

    if (existingCollection) {
      return res.status(400).json({
        success: false,
        message: "A collection with this name already exists",
      });
    }

    const updatedCollection = await collectionModel.findByIdAndUpdate(
      { _id },
      { name: name.trim() },
      {
        new: true, // returns the document after it was updated
        runValidators: true, // ensures these new values coincide with the data model's schema
      }
    );

    if (!updatedCollection) {
      return res
        .status(400)
        .json(
          "Collection not found or you don't have permissions to make updates"
        );
    }

    res.json({ success: true, message: "Collection name updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error: " + error.message,
    });
  }
};

// Delete collection
const deleteCollection = async (req, res) => {
  try {
    const { _id, userId } = req.body;

    // Validate required fields
    if (!_id || !userId) {
      res.status(400).json({
        success: false,
        message: "Collection id and user id required",
      });
    }

    // Start transaction session to ensure both operations success or fail
    const session = await mongoose.startSession();

    try {
      await session.withTransaction(async () => {
        // Delete collection if it exists
        const exists = await collectionModel.findById({ _id });
        if (exists) {
          const deletedCollection = await collectionModel.findOneAndDelete(
            { _id, userId },
            { session }
          );
        } else {
          return res
            .status(400)
            .json({ success: false, message: "Collection not found" });
        }

        // Delete collectionId from user's array of collectionIds
        await userModel.findByIdAndUpdate(
          { _id: userId },
          { $pull: { collections: collections._id } }, // Removes this collection from the array
          { session }
        );

        res.json({ success: true, message: "Collection has been deleted" });
      });

      await session.endSession();
    } catch (transactionError) {
      console.log(transactionError);
      res.status(400).json({
        success: false,
        message: "Failed to delete collection: " + transactionError.message,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error: " + error.message,
    });
  }
};

// Add or remove items from collection
const editItems = async (req, res) => {
  try {
    const { _id, items } = req.body;

    // Validate required fields exist
    if (!_id || !items) {
      res.status(400).json({
        success: false,
        message: "Collection id and item data required",
      });
    }

    const exists = await collectionModel.findById({ _id });

    if (exists) {
    }
  } catch (error) {}
};

export {
  getCollectionIds,
  addCollection,
  renameCollection,
  deleteCollection,
  editItems,
};
