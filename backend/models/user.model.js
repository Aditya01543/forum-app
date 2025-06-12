import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
        minLength: 6
    },

    profilePic: {
        type: String,
        default: ""
    },

    posts: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
            default: []
        }]
    },

    comments: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }],
        default: []
    },

    score: {
        type: Number,
        default: 0
    }
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;