import express from "express"
import {
    getAllProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject,
} from "../controllers/project/project.controller.js"

const router = express.Router()

router.get("/", getAllProjects)

router.get("/:id", getProject)

router.post("/", createProject)

router.put("/:id", updateProject)

router.delete("/:id", deleteProject)

export default router
