const db = require("../../models")

async function getAllProjects(req, res) {
    return res.status(200).json({ message: "OK" })
}

async function getProject(id) {
    return true
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
