import user from "../models/user.js"
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import jwt from "jsonwebtoken";
export const getAllUsers = async (req, res) => { }
export const register = async (req, res) => {
    const { name, email, password } = req.body;
    let userinfo = await user.findOne({ email });
    if (userinfo) {
        return res.status(404).json({
            success: false,
            message: "User Already exist"
        })
    }
    const hashPass = await bcrypt.hash(password, 10);
    userinfo = await user.create({
        name,
        email,
        password: hashPass
    })
    sendCookie(user, res, "Registered Successfully", 201);
}
export const login = async (req, res) => {
    const { email, password } = req.body;
    const userinfo = await user.findOne({ email }).select("+password");
    if (!userinfo) {
        return res.status(404).json({
            success: false,
            message: "Register First"
        });
    }
    const isMatch = await bcrypt.compare(password, userinfo.password);
    if (!isMatch) {
        res.status(404).json({
            success: false,
            message: "Wrong Password"
        })
    }
    sendCookie(userinfo,res,`Welcome Back ${userinfo.name}`,200);
    
}

export const getUserDetails = (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user
    });
     
}
export const logout = (req,res) => {
    res.status(200)
    .cookie("token","",{
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true
    })
    .json({
        success: true,
        user: req.user
    })
}