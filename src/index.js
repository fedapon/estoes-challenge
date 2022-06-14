import dotenv from "dotenv"
import express from "express"

const app = express()
dotenv.config()
const PORT = process.env.PORT | 3000

app.listen(PORT, function () {
    console.log(`Server started on port ${PORT}`)
})
