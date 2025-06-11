import express from "express";

const routes = express.Router();

routes.post("/login", () => {});
routes.post("/signup", () => {});
routes.post("/logout", () => {});

routes.put("/update-pass", () => {});

routes.get("/check", () => {});

export default routes;