import Product from "../Models/productModel.js";
import database from "../databaseConfiguration/database.js";
import User from "../Models/userModel.js";

class productControllers {
  //Create A New Product
  static async createProduct(req, res) {
    try {
      const user = await User.findByPk(req.params.userId);
      if (!user) {
        return res.status(404).json("User not found");
      }
      if(user.userRole==='view'){
        return res.status(404).json("Not allowed to create product as viewer only");

      }
      const product = await Product.create({...req.body, UserId: req.params.userId});
      if (!product) {
        return res.status(400).json("Product creation failed");
      }
      await product.setUser(user);
      return res.status(201).json(product);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  //Get All Products
  static async getProducts(req, res) {
    try {
      const products = await Product.findAll();
      if (products.length === 0) {
        return res.status(404).json("there are no available Admins");
      }
      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  //Get Product By ID
  static async getProductById(req, res) {
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) {
        return res.status(404).json("Product not found");
      }
      return res.status(200).json(product);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  //Delete Product
  static async deleteProduct(req, res) {
    try {
      const deletedProduct = await Product.findByPk(req.params.id);
      if (!deletedProduct) {
        return res.status(404).json("the product was not found");
      }
      await Product.destroy({
        where: {
          id: req.params.id,
        },
      });
      return res.status(200).json({ deletedProduct });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  //Update product
  static async updateProduct(req, res) {
    try {
      const [updatedProduct] = await Product.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      if (!updatedProduct) {
        return res.status(404).json("please enter the fields you want to edit");
      }
      const product = await Product.findByPk(req.params.id);
      return res.status(200).json(product);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}
export default productControllers;
