import { Sequelize } from "sequelize";

const database= new Sequelize("Assesment4", "root","",{
    host: "localhost",
    dialect: "mysql",
    port: "3306",
})
try {
    await database.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
  
  export default database;