import databaseConfig from "./database.js";
import Sequelize from "sequelize";
import products from "../products.js";

const sequelizeInstance = new Sequelize(databaseConfig.DB, databaseConfig.USER, databaseConfig.PASSWORD, {
  host: databaseConfig.HOST,
  dialect: databaseConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: databaseConfig.pool.max,
    min: databaseConfig.pool.min,
    acquire: databaseConfig.pool.acquire,
    idle: databaseConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelizeInstance;

db.products = products(sequelizeInstance, Sequelize);

export default db;

// faz o import do database contendo a informaçoes de conexao //