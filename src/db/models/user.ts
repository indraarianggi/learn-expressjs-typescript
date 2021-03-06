"use strict";
import { Model } from "sequelize";

export interface IUser {
    username: string;
    password: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
    class user extends Model<IUser> implements IUser {
        username!: string;
        password!: string;

        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models: any) {
            // define association here
        }
    }
    user.init(
        {
            username: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "user",
            underscored: true,
        }
    );
    return user;
};
