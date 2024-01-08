import { DataTypes } from "sequelize";
import database from "../databaseConfiguration/database.js";
import User from "./userModel.js";

const Product = database.define("Product", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
//relation one to many
User.hasOne(Product);
Product.belongsTo(User);

Product.sync();
export default Product;