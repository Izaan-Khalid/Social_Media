import { MongoClient } from "mongodb"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const uri = process.env.DB_URI
const client = new MongoClient(uri)
const db = client.db("social_media")

// @desc   Get all users
// @route  GET /api/users
export const getUsers = async (req, res, next) => {
	console.log(`Connecting to the database... ${uri}`)
	const users = await db.collection("users").findOne()
	console.log(users)
	res.status(200).json(users)
}

// @desc   Get a user
// @route  GET /api/users/:id
export const getUser = async (req, res, next) => {
	const id = parseInt(req.params.id)
	console.log(id)
	const user = await db.collection("users").findOne({ id: id })

	if (!user) {
		const err = new Error(`A user with id ${id} does not exist`)
		err.status = 404
		return next(err)
	}

	res.status(200).json(user)
}

//@desc		Create a user
//@route	POST /api/users
export const createUser = async (req, res, next) => {
	console.log(req.body)
	const newUser = {
		id: (await db.collection("users").countDocuments()) + 1,
		...req.body,
	}

	await db.collection("users").insertOne(newUser)
	res.status(201).json(newUser)
}

// @desc   Update a user
// @route  PUT /api/users/:id
export const updateUser = async (req, res, next) => {
	const id = parseInt(req.params.id)
	const updatedUser = req.body
	const user = await db.collection("users").findOne({ id: id })

	await db.collection("users").updateOne({ id: id }, { $set: updatedUser })
	res.status(200).json({ ...user, ...updatedUser })
}

// @desc   Delete a user
// @route  DELETE /api/users/:id
export const deleteUser = async (req, res, next) => {
	const id = parseInt(req.params.id)
	const user = await db.collection("users").findOne({ id: id })

	await db.collection("users").deleteOne({ id: id })
	res.status(200).json(user)
}

// @desc   Login a user
// @route  POST /api/users/login
export const loginUser = async (req, res, next) => {
	const { email, password } = req.body
	const user = await db.collection("users").findOne({ email: email })

	if (!user) {
		const err = new Error(`A user with email ${email} does not exist`)
		err.status = 404
		return next(err)
	}

	const isMatch = await bcrypt.compare(password, user.passwordHash)

	console.log(isMatch)

	if (!isMatch) {
		const err = new Error("Invalid password")
		err.status = 400
		return next(err)
	}

	const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
		expiresIn: "30d",
	})

	res.status(200).json({ token })
}
