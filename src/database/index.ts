import { config } from 'dotenv';
import * as path from 'path';
import { Sequelize } from 'sequelize-typescript';

config({
  path: path.resolve(__dirname, '..', '..', '.env'),
});

export default class Connection {
  private dbconn: Sequelize;

  constructor() {
    this.connect();
  }

  private async connect(): Promise<Sequelize> {
    try {
      this.dbconn = new Sequelize({
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
          return (
            filename.substring(0, filename.indexOf('.model')) ===
            member.toLowerCase()
          );
        },
      });

      await this.dbconn.authenticate();

      await this.dbconn.sync({
        // force: true,
      });

      return this.dbconn;
    } catch (err) {
      throw new Error(err);
    }
  }
}
