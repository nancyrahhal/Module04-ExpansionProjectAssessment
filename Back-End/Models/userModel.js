import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";
import validator from "validator";
import database from "../databaseConfiguration/database.js";
import { Op } from "sequelize";

const User = database.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      this.setDataValue("password", bcrypt.hashSync(value, 10));
    },
  },
  userRole: {
    type: DataTypes.ENUM("creator", "view"),
    allowNull: false,
  },
});

//signup method
User.signup = async function (password, username,userRole) {
  if (!password || !username || !userRole) {
    throw Error("All fields must be filled");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  const exist = await this.findOne({
    where: {
      [Op.or]: [{ username: username }],
    },
  });
  if (exist) {
    throw Error("Username already exist");
  }
  const newUser = await User.create({
    username,
    password,
    userRole,
  });
  return newUser;
};

//login method
User.login = async function (username, password) {
  if (!username) {
    throw Error("Usernameis required");
  }
  if (!password) {
    throw Error("Password is required");
  }

  const user = await this.findOne({
    where: {
      username: username,
    },
  });
  if (!user) {
    throw Error("No user with the given credentials");
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password");
  }
  return user;
};

User.sync();

export default User;
