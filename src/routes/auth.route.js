import { Router } from "express";
import {
  signup,
  login,
  logout,
  getUserDetails,
  users,
} from "../controller/auth.controller.js";
import { auth } from "../middlewares/auth.middleware.js";
import { limiter } from "../middlewares/rateLimit.middleware.js";

const router = new Router();

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: List of users
 */

router.get("/users", limiter, users);
// router.get("/users",  (req, res) => {
//   res.json([{ name: "John Doe" }]);
// });

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Signup a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *     responses:
 *       201:
 *         description: User signed up successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       400:
 *         description: Bad Request (e.g. invalid input)
 */
router.post("/signup", limiter, signup);
router.post("/login", limiter, login);
router.post("/logout", auth, logout);
router.get("/me", auth, getUserDetails);

export default router;
