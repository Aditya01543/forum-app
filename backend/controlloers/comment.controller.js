import Comment from "../models/comment.model.js";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";

export const createComment = async(req, res) => {

    const {id: parentPostID} = req.params;
    const userID = req.user._id;

    const {req_content} = req.body;

    try {

        if(req_content.length == 0){
            return res.status(400).json({message:"Comment is empty!"});
        }

        const newComment = new Comment({
            oCommentor: userID,
            content: req_content
        })

        if(newComment){
            await newComment.save();

            const oUser = await User.findById(userID);
            oUser.comments.push(newComment._id);
            await oUser.save();

            const oPost = await Post.findById(parentPostID);
            oPost.comments.push(newComment._id);
            await oPost.save();

            res.status(200).json({message:"Added a comment."});
        }else{
            return res.status(400).json({message:"Something went wrong XD"});
        }

    } catch (error) {
        console.error("Error in createComment controller: ", error.message)
        res.status(500).json({message:"Internal server error."});
    }
};

export const editComment = async(req, res) => {

    const userID = req.user._id;
    const {id:commentID} = req.params;
    const {req_content} = req.body;

    try {

        let cUser = await User.findById(userID);
        const exists = cUser.comments.includes(commentID);

        if(!exists)return res.status(400).json({message:"Unauthorized editing spotted!"});

        await Comment.findByIdAndUpdate(
            commentID,
            {content:req_content, edited:true}
        );

        res.status(200).json({message:"Comment edited successfully."});
        
    } catch (error) {
        console.error("Error in editComment controller: ", error.message)
        res.status(500).json({message:"Internal server error."});
    }
    
};

export const deleteComment = async(req, res) => {

    const {id:commentID} = req.params;
    const userID = req.user._id;

    try {

        let cUser = await User.findById(userID);
        const exists = cUser.comments.includes(commentID);

        if(!exists)return res.status(400).json({message:"Unauthorized deleting spotted!"});

        await Comment.findByIdAndUpdate(
            commentID,
            {deleted:true}
        );

        res.status(200).json({message:"Comment deleted successfully."});
        
    } catch (error) {
        console.error("Error in deleteComment controller: ", error.message)
        res.status(500).json({message:"Internal server error."});
    }
    
};

export const viewComment = async(req, res) => {

    const {id:commentID} = req.params;
    const userID = req.user._id;

    try {

        let comment = Comment.findById(commentID);

        if(!comment) return res.status(400).json({message:"Comment not found."});

        res.status(200).json({
            res_id: comment._id,
            res_oc: comment.deleted ? "[delted]" : comment.oCommentor,
            res_content: comment.deleted ? "[delted]" : comment.content,
            res_children: comment.children,
            res_edited: comment.edited
        });
        
    } catch (error) {
        console.error("Error in viewComment controller: ", error.message)
        res.status(500).json({message:"Internal server error."});
    }
    
};

export const replyComment = async(req, res) => {

    const {id:parentCommentID} = req.params;
    const userID = req.user._id;

    const {req_content} = req.body;

    try {

        if(req_content.length == 0){
            return res.status(400).json({message:"Comment is empty!"});
        }

        const parentComment = await Comment.findById(parentCommentID);
        if (!parentComment) {
          return res.status(404).json({ message: "Parent comment not found!" });
        }

        const newComment = new Comment({
            oCommentor: userID,
            content: req_content
        });

        if(newComment){
            await newComment.save();

            await User.findByIdAndUpdate(
                userID,
                {$push: {comments:newComment._id}}
            );

            await Comment.findByIdAndUpdate(
                parentCommentID,
                {$push: {children:newComment._id}}
            );

            res.status(200).json({message:"Added a reply."});
        }else{
            return res.status(400).json({message:"Something went wrong XD"});
        }
        
    } catch (error) {
        console.error("Error in replyComment controller: ", error.message)
        res.status(500).json({message:"Internal server error."});
    }
    
};