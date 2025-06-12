import express from "express";
import { createPost, deletePost, editPost, viewPost } from "../controlloers/post.controller";
import { protectRoute } from "../middleware/auth.middleware";

const postRoutes = express.Router();

postRoutes.post("/", protectRoute, createPost);
postRoutes.put("/:id", protectRoute, editPost);
postRoutes.get("/:id", protectRoute, viewPost);
postRoutes.delete("/:id", protectRoute, deletePost);

export default postRoutes;