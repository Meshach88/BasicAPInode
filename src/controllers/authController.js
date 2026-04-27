import express from 'express';
import bcrypt from 'bcrypt';
import { userModel } from '../models/User.js';
import { generateToken } from '../utils/generateToken.js';
import { verifyToken } from '../utils/verifyToken.js';


export const register = async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await userModel.findOne({email});

    if (userExists) {
        return res.status(400).json({status: "error", message: 'User already registered'})
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const newUser = await userModel.create({
        name,
        email,
        password: hashedPassword
    })

    const token = generateToken(newUser._id, res)

    return res.status(201).json({ status: "success", message: "Registration successful", user: { id: newUser._id, name, email } })
    
}

export const login = async (req, res) => {

    const { email, password } = req.body;

    const user = await userModel.findOne({email});

    if(!user) {
        return res.status(401).json({ status: 'error', message: 'Invalid credentials'})
    }
    
    //verify password
    const isMatch = await bcrypt.compare(password, user.password);
    
    if(!isMatch) {
        return res.status(401).json({ status: 'error', message: 'Invalid credentials'})
    }

    //generate jwt
    const token = generateToken(user._id, res)

    return res.json({ status: "success", message: "Login successful", user: { id: user._id, email }, token })
    
}

export const logout = async (req, res) => {
        
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })

    return res.json({
        status: "success",
        message: "Logged out successfully"
    })
    
}