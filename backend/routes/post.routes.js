import express from "express";
import { createPost, deletePost, editPost, viewPost } from "../controlloers/post.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const postRoutes = express.Router();

postRoutes.post("/", protectRoute, createPost);
postRoutes.put("/:id", protectRoute, editPost);
postRoutes.get("/:id", protectRoute, viewPost);
postRoutes.put("/delete/:id", protectRoute, deletePost);

export default postRoutes;