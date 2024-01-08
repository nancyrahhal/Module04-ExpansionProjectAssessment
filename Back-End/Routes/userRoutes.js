import express from "express";
import userControllers from "../Controllers/userController.js";

const userRouters = express.Router();

//signup route
userRouters.post("/signup", userControllers.signupUser);

//login route
userRouters.post("/login", userControllers.loginUser);

export default userRouters