import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    oCreator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    title: {
        type: String,
        required: true,
        maxLength: 301
    },

    content: {
        type: String,
        default:""
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
    },

    edited:{
        type: Boolean,
        default: false
    },

    deleted:{
        type: Boolean,
        default: false
    }
}, {timestamps:true});

const Post = mongoose.model("Post", postSchema);

export default Post;