const express = require("express")
const {
    getAllProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject,
} = require("../controllers/project/project.controller")

const router = express.Router()

router.get("/", getAllProjects)

router.get("/:id", getProject)

router.post("/", createProject)

router.put("/:id", updateProject)

router.delete("/:id", deleteProject)

module.exports = router
