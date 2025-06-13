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
        default: 0
    },

    edited: {
        type: Boolean,
        default: false
    },

    deleted: {
        type: Boolean,
        default: false
    }
}, {timestamps:true});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;