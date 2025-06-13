import express from "express";
import { createComment, deleteComment, editComment, replyComment, viewComment } from "../controlloers/comment.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const commentRoutes = express.Router();

commentRoutes.post("/:id", protectRoute, createComment);
commentRoutes.post("/reply/:id", protectRoute, replyComment);
commentRoutes.put("/:id", protectRoute, editComment);
commentRoutes.get("/:id", protectRoute, viewComment);
commentRoutes.put("/delete/:id", protectRoute, deleteComment);

export default commentRoutes;