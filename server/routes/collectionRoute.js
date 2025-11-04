import express from "express";
import {
  addCollection,
  renameCollection,
  deleteCollection,
  editItems,
  getCollectionIds,
} from "../controllers/collectionController.js";
import authUser from "../middleware/auth.js";

const collectionRouter = express.Router();

collectionRouter.get("/getCollectionIds", getCollectionIds);
collectionRouter.post("/add", addCollection);
collectionRouter.put("/rename", renameCollection);
collectionRouter.delete("/delete", deleteCollection);
collectionRouter.patch("/edit", editItems);

export default collectionRouter;
