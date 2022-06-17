const dotenv = require("dotenv")
const express = require("express")
const cors = require("cors")
const projectRoutes = require("./routes/project.routes")

const app = express()
dotenv.config()
const PORT = process.env.PORT || 3000

if (process.argv[2] === "createDatabase") {
    async function updateDatabase() {
        const db = require("./models")
        await db.sequelize.authenticate()
        await db.sequelize.sync({ force: true })
        console.log("Database created")
    }
    updateDatabase()
}

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

app.listen(PORT, function () {
    console.log(`Server started on port ${PORT}`)
})
