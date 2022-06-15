const { Model } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
    class Project extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Project.belongsTo(models.User, {
                as: "projectManager",
                foreignKey: "project_manager_id",
            })
            Project.belongsToMany(models.User, {
                through: "UsersProjects",
                as: "assignedTo",
            })
        }
    }
    Project.init(
        {
            name: DataTypes.STRING,
            description: DataTypes.STRING,
            status: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Project",
            tableName: "Projects",
            timestamps: true,
            // when told to delete a record, it will not truly delete it.
            // Instead, a special column called deletedAt will have its value
            // set to the timestamp of that deletion request.
            paranoid: true,
        }
    )
    return Project
}
