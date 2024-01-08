import User from "../Models/userModel.js";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, { expiresIn: "3d" });
};

class userControllers {
  //Signup
  static async signupUser(req, res) {
    const { password, username, userRole } = req.body;

    try {
      const newUser = await User.signup(password, username, userRole);
      const token = createToken(newUser.id);
      return res.status(200).json({ newUser, token });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  //Login
  static async loginUser(req, res) {
    const { username, password } = req.body;

    try {
      const user = await User.login(username, password);
      const token = createToken(user.id);
      return res.status(200).json({ user, token });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default userControllers;
