const { Model } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            User.hasMany(models.Project, {
                as: "projects",
                foreignKey: "project_manager_id",
            })
            User.belongsToMany(models.Project, { through: "UsersProjects" })
        }
    }
    User.init(
        {
            firstName: DataTypes.STRING,
            lastName: DataTypes.STRING,
            email: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "User",
            tableName: "Users",
            timestamps: true,
            // when told to delete a record, it will not truly delete it.
            // Instead, a special column called deletedAt will have its value
            // set to the timestamp of that deletion request.
            paranoid: true,
        }
    )
    return User
}
