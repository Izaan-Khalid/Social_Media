import express from "express"
import {
	createUser,
	deleteUser,
	getUser,
	getUsers,
	updateUser,
} from "../controllers/userControllers.js"

const router = express.Router()

// Get all users
router.get("/", getUsers)

// Get single user
router.get("/:id", getUser)

// Create a user
router.post("/", createUser)

// Update a user
router.put("/:id", updateUser)

// Delete a user
router.delete("/:id", deleteUser)

export default router
