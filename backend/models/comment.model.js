import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    oCommentor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

    content: {
        type: String,
        required: true,
    },

    children: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }],
        default: []
    },

    score: {
        type: Number,
        deafult: 0
    }
}, {timestamps:true});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;