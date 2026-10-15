import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// user register function .....................................
export const register = async (req, res) => {
  const { name, email, password, age } = req.body;
  if (name == "" || email == "" || password == "" || age == "")
    return res.json({
      message: "all field are required",
    });

  // bcrtptjs hashpassword
  const hashPassword = await bcrypt.hash(password, 10);

  //duplicacy check using emails............
  let user = await User.findOne({ email });
  if (user)
    return res.json({
      message: "user already exists",
      success: false,
    });

  user = await User.create({
    name,
    email,
    password: hashPassword,
    age,
  });

  res.json({
    message: "user created successfully",
    success: true,
    user,
  });
};

//user login function........................................
export const login = async (req, res) => {
  const { email, password } = req.body;
  //validation:-
  if (email == "" || password == "")
    return res.json({
      message: "all fileds are required",
    });
  //cheack email user exits or not
  const user = await User.findOne({ email });
  if (!user)
    return res.json({
      message: "user already exits",
      success: false,
    });

  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass)
    return res.json({
      message: "valid password",
    });
  const token = jwt.sign({ userId: user._id }, process.env.JWT, {
    expiresIn: "1d",
  });

  res.json({ message: `welcome ${user.name}`, token, success: true });
};
