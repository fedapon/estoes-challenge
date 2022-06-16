const express = require("express")
const {
    getAllProjects,
    getProject,
    createProject,
    assingUserToProject,
    removeUserFromProject,
    updateProject,
    deleteProject,
} = require("../controllers/project/project.controller")

const router = express.Router()

router.get("/", getAllProjects)

router.get("/:id", getProject)

router.post("/", createProject)

router.post("/:id/assing", assingUserToProject)

router.post("/:id/remove", removeUserFromProject)

router.put("/:id", updateProject)

router.delete("/:id", deleteProject)

module.exports = router
