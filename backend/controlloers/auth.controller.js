import User from "../models/user.model.js";
import {generateToken} from "../lib/utils.js";
import bcrypt from "bcryptjs";

export const signUp = async(req, res) => {
    const {req_username, req_email, req_pass} = req.body;
    try {

        let user = await User.findOne({email:req_email});
        if(user){return res.status(400).json({message: "Email already exists!"});}


        if(!req_username || !req_email || !req_pass){
            return res.status(400).json({message: "All fields are required!"});
        }

        if(req_pass.length < 6){
            return res.status(400).json({message: "Password should be atleast 6 characters long!"});
        }

        user = await User.findOne({req_username});

        if(user){return res.status(400).json({message: "Username already exists!"});}

        const salt = await bcrypt.genSalt(10);
        const req_hashedPass = await bcrypt.hash(req_pass, salt);

        const newUser = new User({
            username: req_username,
            email: req_email,
            password: req_hashedPass
        });

        if(newUser){
            generateToken(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                res_id: newUser._id,
                res_username: newUser.username,
                res_email: newUser.email,
                res_profilePic: newUser.profilePic,
                res_posts: newUser.posts,
                res_comments: newUser.comments,
                createdAt: user.createdAt
            });
        }else{
            return res.status(400).json({message: "Invalid user data"});
        }
        
    } catch (error) {
        console.error("Error in signup controller: ", error.message);
        return res.status(500).json({message: "Internal server error"});
    }
}

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge:0});
        res.status(200).json({message : "Logged out successfullt!!"});
    } catch (error) {
        console.error("Error in logout controller: ", error.message);
        return res.status(500).json({message: "Internal server error"});
    }
}

export const login = async(req, res) => {
    const {req_email, req_pass} = req.body;
    try {

        const user = await User.findOne({email:req_email});

        if(!user){return res.status(400).json({message: "Invalid credentials!"})};

        const isPasswordCorrect = await bcrypt.compare(req_pass, user.password);

        if(!isPasswordCorrect){return res.status(400).json({message: "Invalid credentials!"})};

        generateToken(user._id, res);

        res.status(201).json({
            res_id: user._id,
            res_username: user.username,
            res_email: user.email,
            res_profilePic: user.profilePic,
            res_posts: user.posts,
            res_comments: user.comments,
            createdAt: user.createdAt
        });

    } catch (error) {
        console.error("Error in login controller: ", error.message);
        return res.status(500).json({message: "Internal server error"});
    }
}

export const changePass = async(req, res) => {
    const {req_pass} = req.body;
    const userID = req.user._id;
    try {

        if(!req_pass){return res.status(400).json({message:"New password is required."})}

        if(req_pass.length < 6){
            return res.status(400).json({message: "Password should be atleast 6 characters long!"});
        }

        const salt = await bcrypt.genSalt(10);
        const req_hashedPass = await bcrypt.hash(req_pass, salt);

        const updatedUser = await User.findByIdAndUpdate(userID, {password:req_hashedPass}, {new:true});

        res.status(200).json(updatedUser);

    } catch (error) {
        console.log("Error in update password: ", error.message);
        res.status(500).json({message : "Internal server error"});
    }
}

export const checkAuth = (req, res) => {
    try {
        res.status(200).json({
            res_id: req.user._id,
            res_username: req.user.username,
            res_email: req.user.email,
            res_profilePic: req.user.profilePic,
            res_posts: req.user.posts,
            res_comments: req.user.comments,
            createdAt: req.user.createdAt
        });
    } catch (error) {
        console.log("Error in checkAuth controller", error.message);
        res.status(500).json({message : "Internal server error"});
    }
}

export const getName = async(req, res) => {

    const {id:userID} = req.params;

    try {
        const user = await User.findOne({_id:userID});
        if(!user) return res.status(400).json({username:"User not found"});

        res.status(200).json({username:user.username});
    } catch (error) {
        console.log("Error in getName controller", error.message);
        res.status(500).json({message : "Internal server error"});
    }
    
}