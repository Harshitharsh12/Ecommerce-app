import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connect from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";
// import path from "path";
// import { fileURLToPath } from "url";
dotenv.config();

//database config:
connect();
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
const app = express();

//middleware:
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
// app.use(express.static(path.join(__dirname, "./client/build")));

//routes:
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
// Rest API:

// app.use("*", function (req, res) {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });
app.get("/", (req, res) => {
  // res.send("hello");
  // res.send({ message: "Hello Everyone, Welcome to Ecommerse App!!" });
  res.send("<h1>Welcome to Ecommerce App!!</h1>");
});
const PORT = process.env.PORT || 8080;
const MODE = process.env.MODE;
app.listen(PORT, () => {
  console.log(`Server Running on ${MODE} mode on ${PORT}`.bgCyan.blue);
});
