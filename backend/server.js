import express from "express"
import logger from "./middleware/logger.js"
import users from "./routes/users.js"
import cors from "cors"
const port = process.env.PORT || 5000

const app = express()
app.use(cors())

// Body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Logger middleware
app.use(logger)

// Routes
app.use("/api/users", users)

app.listen(port, () => console.log(`Server is running on port ${port}`))
