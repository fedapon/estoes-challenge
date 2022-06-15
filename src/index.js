const dotenv = require("dotenv")
const express = require("express")
const projectRoutes = require("./routes/project.routes")

const app = express()
dotenv.config()
const PORT = process.env.PORT | 3000

app.use("/api/projects", projectRoutes)

app.listen(PORT, function () {
    console.log(`Server started on port ${PORT}`)
})
