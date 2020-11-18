"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const path = require("path");
const sequelize_typescript_1 = require("sequelize-typescript");
dotenv_1.config({
    path: path.resolve(__dirname, '..', '..', '.env'),
});
class Connection {
    constructor() {
        this.connect();
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.dbconn = new sequelize_typescript_1.Sequelize({
                    dialect: 'postgres',
                    host: process.env.DB_HOST,
                    port: Number(process.env.DB_PORT) || 5432,
                    username: process.env.DB_USERNAME,
                    password: process.env.DB_PASSWORD,
                    database: process.env.DB_DATABASE,
                    pool: {
                        max: 5,
                        min: 0,
                        acquire: 30000,
                        idle: 10000,
                    },
                    logging: false,
                    timezone: '-03:00',
                    modelPaths: [path.normalize(`${__dirname}/../app/models`)],
                    modelMatch: (filename, member) => {
                        return (filename.substring(0, filename.indexOf('.model')) ===
                            member.toLowerCase());
                    },
                });
                yield this.dbconn.authenticate();
                yield this.dbconn.sync({
                // force: true,
                });
                return this.dbconn;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
}
exports.default = Connection;
