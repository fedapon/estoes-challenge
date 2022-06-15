const db = require("../../models")

async function getAllProjects(req, res) {
    try {
        const projects = await db.Project.findAll({
            attributes: { exclude: ["project_manager_id"] },
            include: [
                {
                    model: db.User,
                    as: "projectManager",
                    attributes: ["id", "firstName", "lastName"],
                },
                {
                    model: db.User,
                    as: "assignedTo",
                    attributes: ["id", "firstName", "lastName"],
                    through: {
                        attributes: [],
                    },
                },
            ],
        })
        return res
            .status(200)
            .json({ message: "list of all projects", projects })
    } catch (err) {
        return res.status(500).json({
            message: "internal server error",
            error: err.message,
        })
    }
}

async function getProject(req, res) {
    try {
        const { id } = req.params
        const project = await db.Project.findByPk(id, {
            attributes: { exclude: ["project_manager_id"] },
            include: [
                {
                    model: db.User,
                    as: "projectManager",
                    attributes: ["id", "firstName", "lastName"],
                },
                {
                    model: db.User,
                    as: "assignedTo",
                    attributes: ["id", "firstName", "lastName"],
                    through: {
                        attributes: [],
                    },
                },
            ],
        })
        return res.status(200).json({ message: "list one project", project })
    } catch (err) {
        return res.status(500).json({
            message: "internal server error",
            error: err.message,
        })
    }
}

async function createProject(req, res) {
    try {
        const newProject = await db.Project.create(req.body)
        return res
            .status(201)
            .json({ message: "new project created", project: newProject })
    } catch (err) {
        return res.status(500).json({
            message: "internal server error",
            error: err.message,
        })
    }
}

async function updateProject(req, res) {
    try {
        const { id } = req.params
        const project = await db.Project.findByPk(id)
        const updatedProject = await db.Project.update(
            { ...req.body, id },
            { where: { id } }
        )
        if (!updatedProject[0]) {
            return res.status(404).json({ message: "project not found" })
        }
        return res.status(200).json({ message: "project updated" })
    } catch (err) {
        return res.status(500).json({
            message: "internal server error",
            error: err.message,
        })
    }
}

async function deleteProject() {
    return true
}

module.exports = {
    getAllProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject,
}
