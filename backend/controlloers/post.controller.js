import Post from "../models/post.model.js";
import User from "../models/user.model.js";

export const createPost = async(req, res) => {
    const {req_title, req_content} = req.body;
    const userID = req.user._id;
    try {

        if(req_title.length == 0){return res.status(400).json({message: "Title is required."})};
        if(req_title.length >= 301){return res.status(400).json({message: "Title is too long."})};

        const newPost = new Post({
            oCreator: userID,
            title: req_title,
            content: req_content
        });

        if(newPost){
            await newPost.save();
            const updatedUser = await User.findByIdAndUpdate(
              userID,
              { $push: { posts: newPost._id } },
              { new: true }
            );
            res.status(200).json({message: "Post created!!"});
        }else{
            return res.status(400).json({message: "Something went wrong XD"});
        }
        
    } catch (error) {
        console.error("Error in createPost controller: ", error.message)
        res.status(500).json({message:"Internal server error."});
    }
};

export const editPost = async(req, res) => {

    const userID = req.user._id;
    const {id:postID} = req.params;
    const {req_title, req_content} = req.body;
    
    try {

        let cUser = await User.findById(userID);
        let cPost = await Post.findById(postID);

        if(!cUser) return res.status(400).json({message:"User not found."});
        if(!cPost) return res.status(400).json({message:"Post not found."});
        
        if(String(cPost.oCreator) !== String(userID)) return res.status(400).json({message:"Unauthorised editing spotted!!"});

        cPost.title = req_title;
        cPost.content = req_content;
        cPost.edited = true;

        await cPost.save();

        res.status(200).json({message:"Post edited successfully."});

    } catch (error) {
        console.error("Error in editPost controller: ", error.message)
        res.status(500).json({message:"Internal server error."});
    }

};

export const deletePost = async(req, res) => {

    const {id:postID} = req.params;
    const userID = req.user._id;

    try {

        let cPost = await Post.findById(postID);
        if(String(userID) !== String(cPost.oCreator)) return res.status(400).json({message:"Unauthorised editing spotted!!"});

        let cUser = await User.findByIdAndUpdate(
            userID,
            {$pull:{posts:postID}}
        );

        if(!cPost) return res.status(400).json({message:"Post unavailable"});

        cPost.deleted = true;

        await cPost.save();

        res.status(200).json({message:"Post deleted successfully."});
        
    } catch (error) {
        console.error("Error in deletePost controller: ", error.message)
        res.status(500).json({message:"Internal server error."});
    }
    
};

export const viewPost = async(req, res) => {

    const {id:postID} = req.params;
    const userID = req.user._id;

    try {

        let post = await Post.findById(postID)
        .populate({
            path: 'comments',
            model: 'Comment', // make sure this matches your model name
        });
        
        if(!post) return res.status(400).json({message:"Post not found."});

        res.status(200).json({
            res_id:post._id,
            res_oc:post.oCreator,
            res_title:post.title,
            res_content:post.content,
            res_comments:post.comments,
            res_edited:post.edited,
            res_deleted:post.deleted
        });
        
    } catch (error) {
        console.error("Error in viewPost controller: ", error.message)
        res.status(500).json({message:"Internal server error."});
    }
    
};

export const getPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Post.countDocuments();
    const posts = await Post.find()
      .sort({ createdAt: -1 }) // newest first
      .skip(skip)
      .limit(limit).select("_id title oCreator");

    res.status(200).json({
      posts,
      page,
      total,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Failed to load posts" });
  }
};
