const db = require("../../models")
const { Op } = require("sequelize")

async function getAllProjects(req, res) {
    try {
        const { page = 1, paginate = 5, search } = req.query
        const options = {
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
            page: Number(page),
            paginate: Number(paginate),
        }
        if (search) {
            options.where = { name: { [Op.like]: `%${search}%` } }
        }
        const { docs, pages, total } = await db.Project.paginate(options)

        return res.status(200).json({
            message: "list of all projects",
            projects: docs,
            page: Number(page),
            pages,
            total,
        })
    } catch (err) {
        return res.status(500).json({
            message: "internal server error",
            error: err.message,
        })
    }
}

async function getProjectByPk(id) {
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
    return project
}

async function getProject(req, res) {
    try {
        const { id } = req.params
        const project = await getProjectByPk(id)
        if (!project) {
            return res.status(404).json({ message: "project not found" })
        }
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
        let data = { ...req.body }
        if (!data.status) {
            data.status = 1
        }
        const newProject = await db.Project.create(data)
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

async function assingUserToProject(req, res) {
    try {
        const { id: projectId } = req.params
        const { id: userId } = req.body
        const project = await db.Project.findByPk(projectId)
        const user = await db.User.findByPk(userId)
        if (!project || !user) {
            return res
                .status(404)
                .json({ message: "project or user not found" })
        }
        await project.addAssignedTo(user)

        const projectUpdated = await getProjectByPk(projectId)
        return res.status(200).json({
            message: "user assigned to the project",
            project: projectUpdated,
        })
    } catch (err) {
        return res.status(500).json({
            message: "internal server error",
            error: err.message,
        })
    }
}

async function removeUserFromProject(req, res) {
    try {
        const { id: projectId } = req.params
        const { id: userId } = req.body
        const project = await db.Project.findByPk(projectId)
        const user = await db.User.findByPk(userId)
        if (!project || !user) {
            return res
                .status(404)
                .json({ message: "project or user not found" })
        }
        await project.removeAssignedTo(user)

        const projectUpdated = await getProjectByPk(projectId)
        return res.status(200).json({
            message: "user removed from project",
            project: projectUpdated,
        })
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

async function deleteProject(req, res) {
    try {
        const { id } = req.params
        const deletedProject = await db.Project.destroy({ where: { id } })
        if (deletedProject === 0) {
            return res.status(404).json({ message: "project not found" })
        }
        return res.status(200).json({ message: "project deleted" })
    } catch (err) {
        return res.status(500).json({
            message: "internal server error",
            error: err.message,
        })
    }
}

module.exports = {
    getAllProjects,
    getProject,
    createProject,
    assingUserToProject,
    removeUserFromProject,
    updateProject,
    deleteProject,
}
