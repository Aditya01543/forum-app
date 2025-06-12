import express from "express";
import { logout, signUp } from "../controlloers/auth.controller.js";

const routes = express.Router();

routes.post("/login", () => {});
routes.post("/signup", signUp);
routes.post("/logout", logout);

routes.put("/update-pass", () => {});

routes.get("/check", () => {});

export default routes;