const db = require("../../models")
const { Op } = require("sequelize")

async function getAllUsers(req, res) {
    try {
        const { page = 1, paginate = 5, search } = req.query
        const options = {
            page: Number(page),
            paginate: Number(paginate),
        }
        if (search) {
            options.where = { lastName: { [Op.like]: `%${search}%` } }
        }
        const { docs, pages, total } = await db.User.paginate(options)

        return res.status(200).json({
            message: "list of all users",
            users: docs,
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

async function getUser(req, res) {
    try {
        const { id } = req.params
        const user = await db.User.findByPk(id)
        if (!user) {
            return res.status(404).json({ message: "user not found" })
        }
        return res.status(200).json({ message: "one user", user })
    } catch (err) {
        return res.status(500).json({
            message: "internal server error",
            error: err.message,
        })
    }
}

async function createUser(req, res) {
    try {
        const newUser = await db.User.create(req.body)
        return res
            .status(201)
            .json({ message: "new user created", user: newUser })
    } catch (err) {
        return res.status(500).json({
            message: "internal server error",
            error: err.message,
        })
    }
}

module.exports = {
    getAllUsers,
    getUser,
    createUser,
}
