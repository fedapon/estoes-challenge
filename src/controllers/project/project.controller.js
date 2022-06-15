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
                },
            ],
        })
        return res.status(200).json({ message: "list one project", project })
    } catch (err) {
        return res.status(500).json({
            message: "internal server error",
        })
    }
}

async function createProject() {
    return true
}

async function updateProject() {
    return true
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
