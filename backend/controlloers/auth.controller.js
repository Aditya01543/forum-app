import User from "../models/user.model.js";
import {generateToken} from "../lib/utils.js";
import bcrypt from "bcryptjs";

export const signUp = async(req, res) => {
    const {req_username, req_email, req_pass} = req.body;
    try {

        if(!req_username || !req_email || !req_pass){
            return res.status(400).json({message: "All fields are required!"});
        }

        if(req_pass.length < 6){
            return res.status(400).json({message: "Password should be atleast 6 characters long!"});
        }

        let user = await User.findOne({req_email});

        if(user){return res.status(400).json({message: "Email already exists!"});}

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
                res_comments: newUser.comments
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