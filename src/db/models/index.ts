"use strict";

import fs from "fs";
import path from "path";
import { DataTypes, Sequelize } from "sequelize";
import dotenv from "dotenv";
import dbConfig from "../../config/database";

dotenv.config();

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = dbConfig[env];
const db: {
    [x: string]: any;
} = {};

let sequelize: any;

// TODO: handle if config from .env file
sequelize = new Sequelize(
    config.database!, // TODO: handle without "!"
    config.username!,
    config.password,
    config
);

fs.readdirSync(__dirname)
    .filter((file: string) => {
        return (
            file.indexOf(".") !== 0 &&
            file !== basename &&
            file.slice(-3) === ".js" // remain .js, because this file (models/index.ts) will be executed after converted to .js file
        );
    })
    .forEach((file: any) => {
        const model = require(path.join(__dirname, file))(sequelize, DataTypes);
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
