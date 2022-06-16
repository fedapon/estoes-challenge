const dotenv = require("dotenv")
const express = require("express")
const projectRoutes = require("./routes/project.routes")

const app = express()
dotenv.config()
const PORT = process.env.PORT | 3000

async function updateDatabase() {
    const db = require("./models")
    await db.sequelize.authenticate()
    await db.sequelize.sync({ force: false })
}
updateDatabase()

//swagger
const { serve, setup } = require("swagger-ui-express")
const { configSwagger } = require("./documentation/config.swagger")
const swaggerJSDocs = require("swagger-jsdoc")(configSwagger)

//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//routes
app.use("/api/docs", serve, setup(swaggerJSDocs))
app.use("/api/projects", projectRoutes)

app.listen(PORT, function () {
    console.log(`Server started on port ${PORT}`)
})
