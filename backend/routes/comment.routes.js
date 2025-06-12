import express from "express";
import { createComment, deleteComment, editComment, viewComment } from "../controlloers/comment.controller";
import { protectRoute } from "../middleware/auth.middleware";

const commentRoutes = express.Router();

commentRoutes.post("/", protectRoute, createComment);
commentRoutes.put("/:id", protectRoute, editComment);
commentRoutes.get("/:id", protectRoute, viewComment);
commentRoutes.delete("/:id", protectRoute, deleteComment);

export default commentRoutes;