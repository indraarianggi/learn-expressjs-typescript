"use strict";
import { Model } from "sequelize";

export interface ITodo {
    user_id: number;
    description: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
    class todo extends Model<ITodo> implements ITodo {
        user_id!: number;
        description!: string;

        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models: any) {
            // define association here
            todo.belongsTo(models.user);
        }
    }
    todo.init(
        {
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "users",
                    key: "id",
                },
            },
            description: {
                type: DataTypes.TEXT,
            },
        },
        {
            sequelize,
            modelName: "todo",
            underscored: true,
        }
    );
    return todo;
};
