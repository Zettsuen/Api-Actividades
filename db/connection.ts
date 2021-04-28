import { Sequelize } from 'sequelize';


const db = new Sequelize('test', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    // logging: false,
});

export default db;
