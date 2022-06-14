const { Model } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
    class Project extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Project.init(
        {
            name: DataTypes.STRING,
            description: DataTypes.STRING,
            projectManager: DataTypes.STRING,
            asssignedTo: DataTypes.STRING,
            status: DataTypes.TEXT,
        },
        {
            sequelize,
            modelName: "Project",
            tableName: "Projects",
        }
    )
    return Project
}
