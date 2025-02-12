import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import cloudinary from '../config/cloudinary.js'
import path from 'path'
import fs from 'fs'


export const registerController = async (req, res) => {
    const {username, email, password } = req.body
    
    const profilePicture = await cloudinary.uploader.upload(path.resolve(req.file.path), { folder : "profile-pictures" });
    fs.unlinkSync(req.file.path)
    
    if(!username) {
        return res.status(400).json({
            message: "Username is required"
        })
    }
    if(!email) {
        return res.status(400).json({
            message: "Email is required"
        })
    }
    if(!password) {
        return res.status(400).json({
            message: "Password is required"
        })
    }
    if(!profilePicture) {
        return res.status(400).json({
            message: "Profile picture is required"
        })
    }
    
  

    const userExists = await User.findOne({email})
    if(userExists) {
        return res.status(400).json({
            message: "User already exists"
        })
    }

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            profilePicture: profilePicture.secure_url 
    })
    await newUser.save()
    res.status(201).json({
        message: "User registered successfully"
    })
    } catch (error) {
        res.status(500).json({
            message : error.message
        })
    }
}

export const loginController  = async (req, res) => {
    const {email, password} = req.body
    if(!email) {
        return res.status(400).json({
            message: "Email is required"
        })
    }
    if(!password) {
        return res.status(400).json({
            message: "Password is required"
        })
    }
    try {
        const user = await User.findOne({email})
        if(!user) return res.status(404).json({
            message : "User not found"
        })

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) return res.status(400).json({
            message : "Invalid Credentials"
        })
        const token = jwt.sign({ id : user._id}, process.env.JWT_SECRET, {expiresIn : "1d"  })
        res.json({token})

    } catch (error) {
        res.status(500).json({
            message : error.message
        })
    }
}

export const getUserController = async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("-password");
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json(user); 
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
