import dotenv from "dotenv";
dotenv.config();
import express from "express";
import authRoutes from "./routes/auth.route.js";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { options } from "./utils/swagger.js";
import cors from "cors";
const app = express();
app.use(express.json());

// // Swagger definition
// const swaggerDefinition = {
//   openapi: "3.0.0",
//   info: {
//     title: "My API Docs",
//     version: "1.0.0",
//     description: "A simple Express API with Swagger",
//   },
//   servers: [
//     {
//       url: "http://localhost:3000/api/v1",
//     },
//   ],
// };

// const options = {
//   swaggerDefinition,
//   apis: ["./routes/*.js"], // path to the API docs (JSDoc)
// };
// const swaggerSpec = swaggerJsdoc(options);
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// /**
//  * @openapi
//  * /users:
//  *   get:
//  *     summary: Get all users
//  *     responses:
//  *       200:
//  *         description: List of users
//  */
// app.get("/users", (req, res) => {
//   res.json([{ name: "John Doe" }]);
// });

const swaggerSpec = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/v1", authRoutes);
app.use(cors());
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("server is running");
});
