import express from "express";
import UsersController from "../controllers/userController.js";

const router = express.Router();

router.use(express.json());

export default router
    .get("/api/users", UsersController.usersSince)
    .get("/api/users/:username/details", UsersController.userDetails)
    .get("/api/users/:username/repos", UsersController.userRepos);
