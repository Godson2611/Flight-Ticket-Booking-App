/** @format */

import express from "express";
import UserController from "../controllers/User.controller.js";

const router = express.Router();

router.post("/signup", UserController.signupController);
router.post("/signin", UserController.signinController);
router.get("/users", UserController.getAllUsersController);
router.get("/:id", UserController.getUserByIdController);
router.put("/:userId", UserController.updateUserProfile);
router.put("/edituser/:id", UserController.editUserController);
router.delete("/deleteuser/:id", UserController.deleteUserController);
router.post("/forgot-password", UserController.forgotPasswordController);
router.post("/reset-password", UserController.resetPasswordController);

export default router;
