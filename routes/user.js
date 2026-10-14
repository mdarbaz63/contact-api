import express from "express";
import { register, login } from "../controllers/user.js";
const router = express.Router();

//@api desc:- user register
//@api method:- post
//@api endPoint:- /api/user/register
//user register
router.post("/register", register);

//@api desc:- user login
//@api method:- post
//@api endPoint:- /api/user/login
//user login
router.post("/login", login);

export default router;
