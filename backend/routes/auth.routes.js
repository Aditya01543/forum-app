import express from "express";
import { checkAuth, login, logout, signUp } from "../controlloers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const routes = express.Router();

routes.post("/login", login);
routes.post("/signup", signUp);
routes.post("/logout", logout);

routes.put("/update-pass", protectRoute, changePass);

routes.get("/check", protectRoute, checkAuth);

export default routes;