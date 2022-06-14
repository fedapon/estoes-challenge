import dotenv from "dotenv"
import express from "express"
import projectRoutes from "./routes/project.routes.js"

const app = express()
dotenv.config()
const PORT = process.env.PORT | 3000

app.use("/api/projects", projectRoutes)

app.listen(PORT, function () {
    console.log(`Server started on port ${PORT}`)
})
