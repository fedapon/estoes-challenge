const dotenv = require("dotenv")
const express = require("express")
const cors = require("cors")
const projectRoutes = require("./routes/project.routes")
const userRoutes = require("./routes/user.routes")

const app = express()
dotenv.config()
const PORT = process.env.PORT || 3000

//swagger
const { serve, setup } = require("swagger-ui-express")
const { configSwagger } = require("./documentation/config.swagger")
const swaggerJSDocs = require("swagger-jsdoc")(configSwagger)

//middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//routes
app.use("/api/docs", serve, setup(swaggerJSDocs))
app.use("/api/projects", projectRoutes)
app.use("/api/users", userRoutes)

app.listen(PORT, function () {
    console.log(`Server started on port ${PORT}`)
})
