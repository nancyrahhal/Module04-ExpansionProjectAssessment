import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import productRouter from "./Routes/productRoutes.js";
import userRouters from "./Routes/userRoutes.js";
dotenv.config();

const app = express();

// database.sync({alter: true}); 
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    Credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/product",productRouter )
app.use("/api/user",userRouters )


try {
  app.listen(process.env.PORT, () => {
    console.log("app is running on port " + process.env.PORT);
  });
} catch (error) {
  console.log(error);
  process.exit();
}
